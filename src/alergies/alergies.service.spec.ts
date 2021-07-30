import { Test, TestingModule } from '@nestjs/testing';
import { AlergiesService } from './alergies.service';

describe('AlergiesService', () => {
  let service: AlergiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlergiesService],
    }).compile();

    service = module.get<AlergiesService>(AlergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
