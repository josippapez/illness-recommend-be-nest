import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MockType,
  repositoryMockFactory,
} from '../../utils/mocks/repositoryMockFactory.service';
import { Symptom } from '../entities/symptom.entity';
import { SymptomService } from '../symptom.service';

describe('SymptomService', () => {
  let service: SymptomService;
  let repositoryMock: MockType<Repository<Symptom>>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SymptomService,
        {
          provide: getRepositoryToken(Symptom),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = await module.get(SymptomService);
    repositoryMock = module.get(getRepositoryToken(Symptom));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when fetching all symptoms', () => {
    it('should return an array', () => {
      repositoryMock.find.mockReturnValue([]);
      expect(service.findAll()).toEqual([]);
    });
  });
});
