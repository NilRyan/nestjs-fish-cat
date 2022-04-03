import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
}
