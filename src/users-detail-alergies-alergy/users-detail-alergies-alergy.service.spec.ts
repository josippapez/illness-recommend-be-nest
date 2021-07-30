import { Test, TestingModule } from '@nestjs/testing';
import { UsersDetailAlergiesAlergyService } from './users-detail-alergies-alergy.service';

describe('UsersDetailAlergiesAlergyService', () => {
  let service: UsersDetailAlergiesAlergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDetailAlergiesAlergyService],
    }).compile();

    service = module.get<UsersDetailAlergiesAlergyService>(UsersDetailAlergiesAlergyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
