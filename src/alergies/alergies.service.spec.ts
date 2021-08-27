import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AlergiesController } from './alergies.controller';
import { AlergiesService } from './alergies.service';

describe('AlergiesService', () => {
  let service: AlergiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlergiesService, UsersService],
      exports: [AlergiesService],
      controllers: [AlergiesController],
    }).compile();

    service = module.get<AlergiesService>(AlergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
