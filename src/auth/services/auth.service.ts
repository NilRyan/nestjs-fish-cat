import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../../database/enums/postgres-error-code.enum';
import { RegisterUserInput } from '../../users/dto/register-user.input';
import { UsersService } from '../../users/users.service';
import { LoginInput } from '../dto/login.input';
import { Token } from '../model/token.model';
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
    const { email, password } = loginInput;
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    await this.verifyPassword(password, user.password);
    const { id, name } = user;
    const payload = { id, name, email };
    return this.generateTokens(payload);
  }

  async refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
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

  private async generateTokens(payload): Promise<Token> {
    return {
      accessToken: await this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private async generateAccessToken(payload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  private generateRefreshToken(payload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    });
  }
}
