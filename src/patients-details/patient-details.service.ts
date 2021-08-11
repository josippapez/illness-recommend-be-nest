import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientsDetailDto } from './dto/create-patient-detail.dto';
import { PatientDetail } from './entities/patient-detail.entity';
import * as Joi from '@hapi/joi';

@Injectable()
export class PatientDetailsService {
  constructor(
    @InjectRepository(PatientDetail)
    private patientDetailsRepository: Repository<PatientDetail>,
  ) {}

  serializer = Joi.object({
    oib: Joi.number(),
    name: Joi.string(),
    alergies: Joi.array(),
    age: Joi.not(null).required(),
    weight: Joi.not(null).required(),
    pregnantOrBreastFeed: Joi.boolean().required(),
  }).messages({
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  async create(createPatientDetailDto: CreatePatientsDetailDto) {
    const result = this.serializer.validate(createPatientDetailDto, {
      abortEarly: false,
    });

    if (result.error) {
      const arrayOfErrors = [
        ...result.error.details.map((error) => {
          return { message: error.message, field: error.path[0] };
        }),
      ];
      throw new HttpException(arrayOfErrors, HttpStatus.BAD_REQUEST);
    }
    try {
      const newPatientDetail = await this.patientDetailsRepository.save(
        createPatientDetailDto,
      );
      if (newPatientDetail) {
        return {
          ...newPatientDetail,
          successMessage: 'Podaci uspješno spremljeni',
        };
      }
    } catch (error) {
      throw new HttpException(
        'Nešto je pošlo po krivu',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.patientDetailsRepository.find();
  }

  async findOne(id: number) {
    return await this.patientDetailsRepository.findOne(id, {
      relations: ['alergies'],
    });
  }

  async update(createPatientDetailDto: CreatePatientsDetailDto) {
    const newPatientDetail = await this.patientDetailsRepository.save(
      createPatientDetailDto,
    );

    if (newPatientDetail) {
      return { successMessage: 'Promjene uspješno spremljene' };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} patientDetail`;
  }
}
