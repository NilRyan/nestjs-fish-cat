import { UsersRepository } from './../users/repositories/users.repository';
import { MessagesRepository } from './repositories/messages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatsRepository } from './repositories/chats.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessagesRepository,
      ChatsRepository,
      UsersRepository,
    ]),
  ],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
