import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UsersRepository } from './../users/repositories/users.repository';
import { Inject, Injectable } from '@nestjs/common';
import { SwipeInput } from './dto/swipe.input';
import { LikesEntity } from './entities/like.entity';
import { LikesRepository } from './repositories/likes.repository';
import { UserEntity } from '../users/entities/user.entity';
import { ChatsRepository } from '../chat/repositories/chats.repository';
import { ChatsEntity } from '../chat/entities/chats.entity';
import { PUB_SUB } from '../pub_sub/pubSub.module';
import { MATCH } from '../pub_sub/constants/constants';
import { In, Not } from 'typeorm';

@Injectable()
export class MatchService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly chatsRepository: ChatsRepository,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  async swipe(user: UserEntity, swipeInput: SwipeInput) {
    const { judgedUserId, like } = swipeInput;

    const likeEntity: LikesEntity = await this.likesRepository.save({
      userId: user.id,
      judgedUserId,
      like,
    });

    if (like && this.isAlreadyLikedByJudgedUser(judgedUserId, user.id)) {
      const judgedUser = await this.usersRepository.findOne(judgedUserId);
      const chat: ChatsEntity = await this.chatsRepository.createChat(
        user,
        judgedUser,
      );
      const likeOutput = {
        ...likeEntity,
        chatId: chat.id,
      };
      this.pubSub.publish(MATCH, { matchAdded: likeOutput });
      return likeOutput;
    }

    return likeEntity;
  }

  private async isAlreadyLikedByJudgedUser(judgedUserId: string, id: string) {
    const userJudgedRecord = await this.likesRepository.findOne({
      userId: judgedUserId,
      judgedUserId: id,
      like: true,
    });

    return userJudgedRecord ? true : false;
  }

  async getMatches(id: string) {
    const userLikes = await this.likesRepository.find({
      where: { userId: id, like: true },
    });

    const userLiked = await this.likesRepository.find({
      where: { judgedUserId: id, like: true },
    });

    const userLikesIds = userLikes.map((like) => like.judgedUserId);
    const userLikedIds = userLiked.map((like) => like.userId);

    const matches: string[] = userLikesIds.filter((likedId) =>
      userLikedIds.includes(likedId),
    );

    const usersMatched: UserEntity[] = await this.usersRepository.findByIds(
      matches,
    );

    return usersMatched;
  }

  async getUsersYetToBeLiked(userId: string): Promise<UserEntity[]> {
    const userLikes = await this.likesRepository.find({
      where: { userId, like: true },
    });

    return this.usersRepository.find({
      where: { id: Not(In(userLikes.map((like) => like.judgedUserId))) },
    });
  }
}
