import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Symptom } from '../entities/symptom.entity';
import { SymptomController } from '../symptom.controller';
import { SymptomService } from '../symptom.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import { JwtAccessTokenStrategy } from '../../authentication/jwt-access-token.strategy';
import { UsersService } from '../../users/users.service';
import User from '../../users/entities/user.entity';
import { mockedUser } from '../../authentication/tests/user.mock';

describe('SymptomController', () => {
  let app: INestApplication;
  let userData: User;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };

    const symptomRepository = {
      findAll: jest.fn().mockReturnValue([]),
      find: jest.fn().mockReturnValue([]),
    };

    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
      findOne: jest.fn().mockResolvedValue(userData),
      getByEmail: jest.fn().mockResolvedValue(userData),
    };

    const module = await Test.createTestingModule({
      providers: [
        SymptomService,
        JwtAccessTokenStrategy,
        UsersService,
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
        {
          provide: getRepositoryToken(Symptom),
          useValue: symptomRepository,
        },
      ],
      controllers: [SymptomController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('when fetching all symptoms', () => {
    describe('and using valid authentication', () => {
      it('should respond with the data', () => {
        const expectedData = [];
        return request(app.getHttpServer())
          .get('/symptom')
          .auth(
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzAwNjUzMjcsImV4cCI6MTkxNDA2MjEwNSwiYXVkIjoiIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjEifQ.YdJv4h927ywXtQOBJfS8G9d_YTRJRTILV9IIgc-CD2E',
            { type: 'bearer' },
          )
          .expect(200)
          .expect(expectedData);
      });
    });
  });
});
