import { MessagesOutput } from './dto/messages.output';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { PUB_SUB } from '../pub_sub/pubSub.module';
import { CHAT } from './constants/constants';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { GqlAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import { ChatOutput } from './dto/chat.output';

// NOTE: Chat Subscription Pattern `${CHAT}.${chatId}`

@UseGuards(GqlAuthGuard)
@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  // @Query(() => [ChatOutput])
  // async getAllChats(
  //   @GetCurrentUser() currentUser: UserEntity,
  // ): Promise<ChatOutput[]> {
  //   return await this.chatService.getAllChats(currentUser);
  // }

  @Mutation(() => MessagesOutput)
  async sendMessage(
    @Args('chatId') chatId: string,
    @Args('message') message: string,
    @GetCurrentUser() currentUser: UserEntity,
  ) {
    const newMessage = await this.chatService.sendMessage(
      chatId,
      message,
      currentUser,
    );
    this.pubSub.publish(`${CHAT}.${chatId}`, { newMessage });
    return newMessage;
  }

  @Mutation(() => ChatOutput)
  async createChat(
    @Args('participantId') participantId: string,
    @GetCurrentUser() currentUser: UserEntity,
  ) {
    const chat = await this.chatService.createChat(participantId, currentUser);
    return chat;
  }

  @Subscription(() => MessagesOutput)
  listenToChat(@Args('chatId') chatId: string) {
    return this.pubSub.asyncIterator(`${CHAT}.${chatId}`);
  }
}
