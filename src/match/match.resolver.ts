import { GqlAuthGuard } from './../auth/guards/graphql-jwt-auth.guard';
import { UserProfileOutput } from './../users/dto/user-profile.output';
import { UserEntity } from './../users/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { LikeOutput } from './dto/like.output';
import { SwipeInput } from './dto/swipe.input';
import { MatchService } from './match.service';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(() => LikeOutput)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation(() => LikeOutput)
  async swipe(
    @GetCurrentUser() user: UserEntity,
    @Args('swipeInput') swipeInput: SwipeInput,
  ): Promise<LikeOutput> {
    return await this.matchService.swipe(user, swipeInput);
  }

  @Query(() => [UserProfileOutput])
  getMatches(
    @GetCurrentUser() { id }: UserEntity,
  ): Promise<UserProfileOutput[]> {
    return this.matchService.getMatches(id);
  }
}
