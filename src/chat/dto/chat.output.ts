import { UserProfileOutput } from '../../users/dto/user-profile.output';
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { MessagesOutput } from './messages.output';

@ObjectType()
export class ChatOutput {
  @Field()
  id: string;

  @Field(() => UserProfileOutput)
  createdBy: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => [UserProfileOutput])
  participants: UserProfileOutput[];

  @Field(() => [MessagesOutput])
  messages: MessagesOutput[];
}
