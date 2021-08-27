import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MockType,
  repositoryMockFactory,
} from '../../utils/mocks/repositoryMockFactory.service';
import { PatientDetail } from '../entities/patient-detail.entity';
import { PatientDetailsService } from '../patient-details.service';

describe('PatientDetailsService', () => {
  let service: PatientDetailsService;
  let repositoryMock: MockType<Repository<PatientDetail>>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PatientDetailsService,
        {
          provide: getRepositoryToken(PatientDetail),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = await module.get(PatientDetailsService);
    repositoryMock = module.get(getRepositoryToken(PatientDetail));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating new patient', () => {
    it('should return patient and success message', async () => {
      expect(
        await service.create({
          userId: 1,
          oib: '6767',
          name: 'test',
          age: 88,
          alergies: [],
          pregnantOrBreastFeed: true,
          weight: 99,
        }),
      ).toEqual({
        userId: 1,
        oib: '6767',
        name: 'test',
        age: 88,
        alergies: [],
        pregnantOrBreastFeed: true,
        weight: 99,
        id: 1,
        successMessage: 'Podaci uspješno spremljeni',
      });
    });
    it('should return errors when wrong data is sent', async () => {
      try {
        await service.create({
          userId: 1,
          oib: null,
          name: null,
          age: null,
          alergies: [],
          pregnantOrBreastFeed: false,
          weight: null,
        });
      } catch (error) {
        expect(error.response).toEqual([
          {
            message: 'Polje je obavezno',
            field: 'oib',
          },
          {
            message: 'Vrijednost mora biti broj',
            field: 'oib',
          },
          {
            message: 'Polje je obavezno',
            field: 'name',
          },
          {
            message: 'Vrijednost nije pravilnog formata',
            field: 'name',
          },
          {
            message: 'Polje je obavezno',
            field: 'age',
          },
          {
            message: 'Vrijednost mora biti broj',
            field: 'age',
          },
          {
            message: 'Polje je obavezno',
            field: 'weight',
          },
          {
            message: 'Vrijednost mora biti broj',
            field: 'weight',
          },
        ]);
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('when fetching all patient details', () => {
    it('should return an array', async () => {
      repositoryMock.find.mockReturnValue([]);
      expect(await service.findAll()).toEqual([]);
      expect(await service.findAllByUserId(1)).toEqual([]);
    });
  });

  describe('when updating patient', () => {
    it('should return success message', async () => {
      expect(
        await service.update({
          id: 1,
          created: '2021-08-27T15:09:47.813Z',
          oib: '545346',
          name: 'test',
          age: 77,
          weight: 8,
          pregnantOrBreastFeed: true,
          medicationsSelected: [],
          alergies: [],
        }),
      ).toEqual({
        successMessage: 'Promjene uspješno spremljene',
      });
    });
    it('should return errors when wrong data is sent', async () => {
      try {
        await service.update({
          id: 10,
          created: '2021-08-27T15:09:47.813Z',
          oib: '',
          name: '',
          age: null,
          weight: null,
          pregnantOrBreastFeed: true,
          medicationsSelected: [],
          alergies: [],
        });
      } catch (error) {
        expect(error.response).toEqual([
          {
            message: 'Vrijednost mora biti broj',
            field: 'oib',
          },
          {
            message: 'Polje je obavezno',
            field: 'name',
          },
          {
            message: 'Polje je obavezno',
            field: 'age',
          },
          {
            message: 'Vrijednost mora biti broj',
            field: 'age',
          },
          {
            message: 'Polje je obavezno',
            field: 'weight',
          },
          {
            message: 'Vrijednost mora biti broj',
            field: 'weight',
          },
        ]);
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
