import { UserProfileOutput } from './dto/user-profile.output';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';

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
  updateUserById(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
}
