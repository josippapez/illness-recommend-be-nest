import { Test, TestingModule } from '@nestjs/testing';
import { PatientsDetailsController } from './patient-details.controller';
import { PatientDetailsService } from './patient-details.service';

describe('PatientsDetailsController', () => {
  let controller: PatientsDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsDetailsController],
      providers: [PatientDetailsService],
    }).compile();

    controller = module.get<PatientsDetailsController>(
      PatientsDetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
