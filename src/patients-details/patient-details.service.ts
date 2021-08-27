import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, getConnection, Repository } from 'typeorm';
import { CreatePatientsDetailDto } from './dto/create-patient-detail.dto';
import { PatientDetail } from './entities/patient-detail.entity';
import * as Joi from '@hapi/joi';
import { UpdatePatientsDetailDto } from './dto/update-patient-detail.dto';
@Injectable()
export class PatientDetailsService {
  constructor(
    @InjectRepository(PatientDetail)
    private patientDetailsRepository: Repository<PatientDetail>,
  ) {}

  serializer = Joi.object({
    userId: Joi.number().required(),
    oib: Joi.number().not(null).required(),
    name: Joi.string().not(null).required(),
    alergies: Joi.array(),
    age: Joi.number().not(null).required(),
    weight: Joi.number().not(null).required(),
    pregnantOrBreastFeed: Joi.boolean().required(),
  }).messages({
    'number.base': 'Vrijednost mora biti broj',
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  updateSerializer = Joi.object({
    id: Joi.number().required(),
    created: Joi.string(),
    oib: Joi.number().not(null).required(),
    name: Joi.string().not(null).required(),
    alergies: Joi.array(),
    age: Joi.number().not(null).required(),
    weight: Joi.number().not(null).required(),
    pregnantOrBreastFeed: Joi.boolean().required(),
    medicationsSelected: Joi.array(),
  }).messages({
    'number.base': 'Vrijednost mora biti broj',
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  removeSerializer = Joi.object({
    id: Joi.not(null).required(),
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

  async findAll() {
    return await this.patientDetailsRepository.find();
  }

  async findAllByUserId(userId: number) {
    return await this.patientDetailsRepository.find({ where: { userId } });
  }

  async getByText(
    search: string,
    user: {
      id?: number;
      email: string;
      name: string;
      password: string;
      role: string;
    },
  ) {
    let patients = null;
    if (user.role === 'admin') {
      patients = getConnection()
        .createQueryBuilder()
        .select('patient')
        .from(PatientDetail, 'patient')
        .where('LOWER(patient.name) like LOWER(:name)', {
          name: `%${search}%`,
        })
        .orWhere('patient.oib like :oib', {
          oib: `%${search}%`,
        })
        .orderBy('patient.name', 'ASC')
        .getMany();
    } else if (user.role === 'user') {
      patients = getConnection()
        .createQueryBuilder()
        .select('patient')
        .from(PatientDetail, 'patient')
        .where('patient.userId = :userId', { userId: user.id })
        .andWhere(
          new Brackets((qb) => {
            qb.where('LOWER(patient.name) like LOWER(:name)', {
              name: `%${search}%`,
            }).orWhere('patient.oib like :oib', {
              oib: `%${search}%`,
            });
          }),
        )
        .orderBy('patient.name', 'ASC')
        .getMany();
    }
    if (patients) {
      return patients;
    }
    throw new HttpException('Nema pronađenih pacijenata', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    return await this.patientDetailsRepository.findOne(id, {
      relations: ['alergies'],
    });
  }

  async update(updatePatientsDetailDto: UpdatePatientsDetailDto) {
    const result = this.updateSerializer.validate(updatePatientsDetailDto, {
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

    const newPatientDetail = await this.patientDetailsRepository.save(
      updatePatientsDetailDto,
    );

    if (newPatientDetail) {
      return { successMessage: 'Promjene uspješno spremljene' };
    }
  }

  async remove(id: number) {
    const result = this.removeSerializer.validate(id, {
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

    const response = await this.patientDetailsRepository.delete(id);
    if (response) {
      return { successMessage: 'Unos uspješno obrisan' };
    }
  }
}
