import { UsersRepository } from './../users/repositories/users.repository';
import { LikesRepository } from './repositories/likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';
import { ChatsRepository } from '../chat/repositories/chats.repository';
import { PubSubModule } from '../pub_sub/pubSub.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikesRepository,
      UsersRepository,
      ChatsRepository,
    ]),
    PubSubModule,
  ],
  providers: [MatchResolver, MatchService],
})
export class MatchModule {}
