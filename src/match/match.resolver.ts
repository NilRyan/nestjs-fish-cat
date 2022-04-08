import { UserEntity } from './../users/entities/user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { LikeOutput } from './dto/like.output';
import { SwipeInput } from './dto/swipe.input';
import { MatchService } from './match.service';

@Resolver(() => LikeOutput)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation(() => LikeOutput)
  swipe(
    @GetCurrentUser() { id }: UserEntity,
    @Args('swipeInput') swipeInput: SwipeInput,
  ) {
    return this.matchService.swipe(id, swipeInput);
  }

  // ADD ResolveField for likeOutput
}
