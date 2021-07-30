import { Test, TestingModule } from '@nestjs/testing';
import { UsersDetailAlergiesAlergyController } from './users-detail-alergies-alergy.controller';
import { UsersDetailAlergiesAlergyService } from './users-detail-alergies-alergy.service';

describe('UsersDetailAlergiesAlergyController', () => {
  let controller: UsersDetailAlergiesAlergyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDetailAlergiesAlergyController],
      providers: [UsersDetailAlergiesAlergyService],
    }).compile();

    controller = module.get<UsersDetailAlergiesAlergyController>(
      UsersDetailAlergiesAlergyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
