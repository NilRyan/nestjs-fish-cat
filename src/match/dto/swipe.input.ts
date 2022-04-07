import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SwipeInput {
  @Field(() => ID)
  judgedUserId: string;

  @Field()
  like: boolean;
}
