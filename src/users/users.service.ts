import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import Gender from './enums/gender.enum';
import Role from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(registerUserInput: RegisterUserInput): Promise<UserEntity> {
    return await this.usersRepository.createUser(registerUserInput);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.update(id, updateUserInput);
  }
}
