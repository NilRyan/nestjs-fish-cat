import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeOutput {
  @Field()
  userId: string;

  @Field()
  judgedUserId: string;

  @Field()
  like: boolean;

  @Field({ nullable: true })
  chatId?: string;
}
