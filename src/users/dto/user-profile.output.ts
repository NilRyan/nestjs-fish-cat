import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import Gender from '../enums/gender.enum';

@ObjectType()
export class UserProfileOutput {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  aboutMe?: string;

  @Field(() => GraphQLISODateTime)
  birthDate: Date;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  name: string;
}
