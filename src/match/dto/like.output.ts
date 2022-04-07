import { UserProfileOutput } from './../../users/dto/user-profile.output';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeOutput {
  @Field()
  user: UserProfileOutput;

  @Field()
  judgedUser: UserProfileOutput;

  @Field()
  like: boolean;
}
