import { LoginInput } from '../dto/login.input';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import PostgresErrorCode from '../../database/enums/postgres-error-code.enum';
import { UsersService } from '../../users/users.service';
import { RegisterUserInput } from '../../users/dto/register-user.input';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterUserInput) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Username or email already exists');
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginInput: LoginInput) {
    const { username, password } = loginInput;
    const user = await this.usersService.getUserByUsername(username);
    if (!user) throw new BadRequestException('Invalid credentials');

    await this.verifyPassword(password, user.password);
    const { id, name, email } = user;
    const payload = { id, name, email };
    const accessToken: string = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid password');
    }
  }
}
