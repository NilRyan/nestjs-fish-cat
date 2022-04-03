import { Field, ObjectType } from '@nestjs/graphql';
import { UserProfileOutput } from '../../users/dto/user-profile.output';
import { ChatOutput } from './chat.output';

@ObjectType()
export class MessagesOutput {
  @Field()
  chatId: string;

  @Field(() => ChatOutput)
  chat: ChatOutput;

  @Field()
  authorId: string;

  @Field(() => UserProfileOutput)
  author: UserProfileOutput;

  @Field()
  message: string;

  @Field()
  createdAt: Date;
}
