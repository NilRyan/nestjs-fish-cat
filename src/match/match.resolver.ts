import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LikeOutput } from './dto/like.output';
import { SwipeInput } from './dto/swipe.input';
import { MatchService } from './match.service';

@Resolver(() => LikeOutput)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation(() => LikeOutput)
  swipe(@Args('swipeInput') swipeInput: SwipeInput) {
    return this.matchService.swipe(swipeInput);
  }
}
