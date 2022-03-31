import { UserProfileOutput } from './../../users/dto/user-profile.output';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto/login.input';
import { AccessTokenOutput } from '../dto/access-token.output';
import { RegisterUserInput } from '../../users/dto/register-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => AccessTokenOutput)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation((returns) => UserProfileOutput)
  register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }
}
