import { Test, TestingModule } from '@nestjs/testing';
import { AlergiesController } from './alergies.controller';
import { AlergiesService } from './alergies.service';

describe('AlergiesController', () => {
  let controller: AlergiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlergiesController],
      providers: [AlergiesService],
    }).compile();

    controller = module.get<AlergiesController>(AlergiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
