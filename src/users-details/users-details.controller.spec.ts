import { Test, TestingModule } from '@nestjs/testing';
import { UsersDetailsController } from './users-details.controller';
import { UsersDetailsService } from './users-details.service';

describe('UsersDetailsController', () => {
  let controller: UsersDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDetailsController],
      providers: [UsersDetailsService],
    }).compile();

    controller = module.get<UsersDetailsController>(UsersDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
