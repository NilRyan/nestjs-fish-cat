import { LikesRepository } from './repositories/likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LikesRepository])],
  providers: [MatchResolver, MatchService],
})
export class MatchModule {}
