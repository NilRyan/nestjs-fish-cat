import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Token } from 'graphql';
import { RegisterUserInput } from '../../users/dto/register-user.input';
import { AccessTokenOutput } from '../dto/access-token.output';
import { LoginInput } from '../dto/login.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { AuthService } from '../services/auth.service';
import { UserProfileOutput } from './../../users/dto/user-profile.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => AccessTokenOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation((returns) => UserProfileOutput)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserProfileOutput> {
    return this.authService.register(registerUserInput);
  }

  @Mutation((returns) => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token);
  }
}
