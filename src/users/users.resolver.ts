import { UserProfileOutput } from './dto/user-profile.output';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserProfileOutput)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserProfileOutput)
  async createUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserProfileOutput> {
    return await this.usersService.createUser(registerUserInput);
  }

  @Query(() => [UserProfileOutput], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserProfileOutput, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => UserProfileOutput)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserProfileOutput)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
