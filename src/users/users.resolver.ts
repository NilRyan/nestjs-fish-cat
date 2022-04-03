import { GqlAuthGuard } from './../auth/guards/graphql-jwt-auth.guard';
import { UserProfileOutput } from './dto/user-profile.output';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
@UseGuards(GqlAuthGuard)
@Resolver(() => UserProfileOutput)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserProfileOutput], { name: 'users' })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => UserProfileOutput, { name: 'user' })
  getUserById(@Args('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => UserProfileOutput)
  updateUserById(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }
}
