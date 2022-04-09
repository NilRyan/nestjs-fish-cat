import { UsersRepository } from './../users/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { SwipeInput } from './dto/swipe.input';
import { LikesEntity } from './entities/like.entity';
import { LikesRepository } from './repositories/likes.repository';
import { UserEntity } from '../users/entities/user.entity';
import { ChatsRepository } from '../chat/repositories/chats.repository';
import { ChatsEntity } from '../chat/entities/chats.entity';

@Injectable()
export class MatchService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async swipe(user: UserEntity, swipeInput: SwipeInput) {
    const { judgedUserId, like } = swipeInput;
    const likeEntity: LikesEntity = await this.likesRepository.findOne({
      where: { userId: user.id, judgedUserId: judgedUserId },
    });

    await this.likesRepository.save({
      userId: user.id,
      judgedUserId,
      like,
    });

    if (like && this.isAlreadyLikedByJudgedUser(judgedUserId, user.id)) {
      // TODO: Create a chatroom and create notif to both users
      const judgedUser = await this.usersRepository.findOne(judgedUserId);
      const chat: ChatsEntity = await this.chatsRepository.createChat(
        user,
        judgedUser,
      );
      return {
        ...likeEntity,
        chatId: chat.id,
      };
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
}
