import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import { AuthenticationController } from '../authentication.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { mockedUser } from './user.mock';
import User from '../../users/entities/user.entity';
import { JwtRefreshTokenStrategy } from '../jwt-refresh-token.strategy';
import { LocalStrategy } from '../local.strategy';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('The AuthenticationController', () => {
  let app: INestApplication;
  let userData: User;
  let bcryptCompare: jest.Mock;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;
    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
      findOne: jest.fn().mockResolvedValue(userData),
      getByEmail: jest.fn().mockResolvedValue(userData),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        UsersService,
        AuthenticationService,
        JwtRefreshTokenStrategy,
        LocalStrategy,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          ...userData,
        };
        delete expectedData.password;
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: mockedUser.email,
            name: mockedUser.name,
            password: 'strongPassword',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            name: mockedUser.name,
          })
          .expect(400);
      });
    });
  });
  describe('when login', () => {
    describe('and using valid data', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          user: { ...userData },
          accessToken: '',
          refreshToken: '',
        };
        delete expectedData.user.password;
        return request(app.getHttpServer())
          .post('/authentication/log-in')
          .send({
            email: mockedUser.email,
            password: mockedUser.password,
          })
          .expect(200)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/log-in')
          .send({
            email: mockedUser.name,
            passport: 'wrongPassword',
          })
          .expect(401);
      });
    });
  });
  describe('when refreshing token', () => {
    describe('and using valid data', () => {
      it('should respond with the new access token', () => {
        return request(app.getHttpServer())
          .get('/authentication/refresh')
          .auth(
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzAwNjUzMjcsImV4cCI6MTkxNDA2MjEwNSwiYXVkIjoiIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjEifQ.YdJv4h927ywXtQOBJfS8G9d_YTRJRTILV9IIgc-CD2E',
            { type: 'bearer' },
          )
          .expect(200);
      });
    });
  });
});
