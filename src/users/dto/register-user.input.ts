import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import Gender from '../enums/gender.enum';

@InputType()
export class RegisterUserInput {
  @Field()
  @Length(1, 60)
  name: string;

  @Field()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @Field()
  @IsAlphanumeric()
  @Length(6, 20)
  password: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsDate()
  birthDate: Date;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  gender?: Gender;

  @Field()
  @Length(1, 300)
  aboutMe: string;
}
