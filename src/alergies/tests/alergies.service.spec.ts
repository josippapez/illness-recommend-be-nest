import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlergiesService } from '../alergies.service';
import { Alergy } from '../entities/alergy.entity';

describe('AlergiesService', () => {
  let service: AlergiesService;
  beforeEach(async () => {
    const alergiesRepository = {
      findAll: jest.fn().mockReturnValue([]),
      find: jest.fn().mockReturnValue([]),
    };

    const module = await Test.createTestingModule({
      providers: [
        AlergiesService,
        {
          provide: getRepositoryToken(Alergy),
          useValue: alergiesRepository,
        },
      ],
    }).compile();
    service = await module.get(AlergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when fetching all alergies', () => {
    it('should return an array', () => {
      expect(service.findAll()).toEqual([]);
    });
  });
});
