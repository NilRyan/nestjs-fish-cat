import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import Gender from './enums/gender.enum';
import Role from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  create(createUserInput: RegisterUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  getUserById(id: string) {
    return {
      name: 'Philip',
      email: 'philipcalape@gmail.com',
      password: '123456',
      birthDate: new Date(),
      aboutMe: 'I am a software developer',
      gender: Gender.Male,
      role: Role.Admin,
    } as UserEntity;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return {
      name: 'Philip',
      email: 'philipcalape@gmail.com',
      password: '123456',
      birthDate: new Date(),
      aboutMe: 'I am a software developer',
      gender: Gender.Male,
      role: Role.Admin,
    } as UserEntity;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
