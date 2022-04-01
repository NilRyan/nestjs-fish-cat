import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @Length(4, 254)
  readonly email: string;

  @Field()
  @Length(6, 20)
  readonly password: string;
}
