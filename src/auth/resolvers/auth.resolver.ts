import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserInput } from '../../users/dto/register-user.input';
import { LoginInput } from '../dto/login.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { Token } from '../model/token.model';
import { AuthService } from '../services/auth.service';
import { UserProfileOutput } from './../../users/dto/user-profile.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Token)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => UserProfileOutput)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserProfileOutput> {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token);
  }
}
