import { Test, TestingModule } from '@nestjs/testing';
import { UsersDetailsService } from './users-details.service';

describe('UsersDetailsService', () => {
  let service: UsersDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDetailsService],
    }).compile();

    service = module.get<UsersDetailsService>(UsersDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
