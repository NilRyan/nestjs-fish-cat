import { GqlAuthGuard } from './../auth/guards/graphql-jwt-auth.guard';
import { UserProfileOutput } from './../users/dto/user-profile.output';
import { UserEntity } from './../users/entities/user.entity';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { LikeOutput } from './dto/like.output';
import { SwipeInput } from './dto/swipe.input';
import { MatchService } from './match.service';
import { Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pub_sub/pubSub.module';
import { MATCH } from '../pub_sub/constants/constants';

@UseGuards(GqlAuthGuard)
@Resolver(() => LikeOutput)
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Mutation(() => LikeOutput)
  async swipe(
    @GetCurrentUser() user: UserEntity,
    @Args('swipeInput') swipeInput: SwipeInput,
  ): Promise<LikeOutput> {
    return await this.matchService.swipe(user, swipeInput);
  }

  @Query(() => [UserProfileOutput])
  async getMatches(
    @GetCurrentUser() { id }: UserEntity,
  ): Promise<UserProfileOutput[]> {
    return this.matchService.getMatches(id);
  }

  @Subscription(() => LikeOutput)
  async matchAdded() {
    return await this.pubSub.asyncIterator(MATCH);
  }
}
