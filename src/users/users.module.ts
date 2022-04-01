import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
