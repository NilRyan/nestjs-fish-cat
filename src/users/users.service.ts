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

  async findAll() {
    return `This action returns all users`;
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return {
      name: 'Philip',
      email: 'philipcalape@gmail.com',
      password: '$2a$10$VbunJyso/iScp92zRroc6.TiK6FLUY2kRfNvWFANbwUbiyn3Emw16',
      birthDate: new Date(),
      aboutMe: 'I am a software developer',
      gender: Gender.Male,
      role: Role.Admin,
    } as UserEntity;
  }
}
