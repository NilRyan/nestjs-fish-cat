import { ChatsEntity } from './entities/chats.entity';
import { UsersRepository } from './../users/repositories/users.repository';
import { UserEntity } from './../users/entities/user.entity';
import { MessagesEntity } from './entities/messages.entity';
import { MessagesRepository } from './repositories/messages.repository';
import { ChatsRepository } from './repositories/chats.repository';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly messagesRepository: MessagesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createChat(participantId: string, currentUser: UserEntity) {
    const participant = await this.usersRepository.findOne({
      id: participantId,
    });
    const chat = await this.chatsRepository.save({
      createdBy: currentUser,
      participants: [currentUser, participant],
    });
    return chat;
  }

  async getAllChats(currentUser: UserEntity) {
    const chats = await this.chatsRepository.find({
      where: {
        participants: In([currentUser]),
      },
      relations: ['createdBy', 'participants', 'messages'],
    });
    return chats;
  }
  async sendMessage(
    chatId: string,
    message: string,
    currentUser: UserEntity,
  ): Promise<MessagesEntity> {
    let chat = await this.chatsRepository.findOne({ id: chatId });
    // TODO: since matching logic is not implemented, we just create a chatroom
    if (!chat) {
      chat = await this.chatsRepository.save({
        createdBy: currentUser,
        // TODO: create an event that creates a chat room and include the matching user
        participants: [currentUser],
      });
    }
    const newMessage = await this.messagesRepository.save({
      chat,
      message,
    });
    return newMessage;
  }
}
