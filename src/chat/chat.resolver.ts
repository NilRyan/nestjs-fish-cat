import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { PUB_SUB } from '../pub_sub/pubSub.module';

@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}
}
