import { Injectable } from '@nestjs/common';
import { SwipeInput } from './dto/swipe.input';
import { LikesEntity } from './entities/like.entity';
import { LikesRepository } from './repositories/likes.repository';

@Injectable()
export class MatchService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async swipe(id: string, swipeInput: SwipeInput) {
    const { judgedUserId, like } = swipeInput;
    const likeEntity: LikesEntity = await this.likesRepository.findOne({
      where: { id, judgedUserId: id },
    });
    if (likeEntity) {
      likeEntity.like = like;
      await this.likesRepository.save(likeEntity);
    } else {
      await this.likesRepository.save({
        userId: id,
        judgedUserId,
        like,
      });
    }

    if (like && this.isAlreadyLikedByJudgedUser(judgedUserId, id)) {
      // TODO: Create a chatroom and create notif to both users
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
}
