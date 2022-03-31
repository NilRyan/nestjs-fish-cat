import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { RegisterUserInput } from './register-user.input';

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {
  @Field(() => ID)
  id: string;
}
