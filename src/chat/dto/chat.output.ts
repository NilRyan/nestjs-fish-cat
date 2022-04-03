import { UserProfileOutput } from './../../users/dto/user-profile.output';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatOutput {
  @Field()
  id: string;

  @Field(() => UserProfileOutput)
  createdBy: string;

  @Field()
  createdAt: Date;
}
