import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { UserProfileOutput } from '../../users/dto/user-profile.output';

@ObjectType()
export class MessageOutput {
  @Field(() => UserProfileOutput)
  author: UserProfileOutput;

  @Field()
  message: string;

  @Field()
  createdAt: string;
}
