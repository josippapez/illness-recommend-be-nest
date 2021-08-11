import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './tokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  serializer = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().not(null).required(),
  }).messages({
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  public async register(registrationData: RegisterDto) {
    const result = this.serializer.validate(registrationData, {
      abortEarly: false,
    });
    if (result.error) {
      throw new HttpException(
        [
          ...result.error.details.map((error) => {
            return { message: error.message, field: error.path[0] };
          }),
        ],
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Korisnik sa ovim emailom već postoji',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Nešto je pošlo po krivu',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return token;
  }

  public getJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return token;
  }

  public getCookieForLogOut() {
    return null;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        { successMessage: 'Krivi podaci poslani' },
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        { successMessage: 'Krivi podaci poslani' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
