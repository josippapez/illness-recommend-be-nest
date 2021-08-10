import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';
import { Alergy } from './entities/alergy.entity';
import * as Joi from '@hapi/joi';
@Injectable()
export class AlergiesService {
  constructor(
    @InjectRepository(Alergy)
    private alergyRepository: Repository<Alergy>,
  ) {}

  serializer = Joi.object({
    name: Joi.string().not(null).required(),
  }).messages({
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  async create(createAlergyDto: CreateAlergyDto) {
    const result = this.serializer.validate(createAlergyDto, {
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
      const newAlergy = this.alergyRepository.create(createAlergyDto);
      await this.alergyRepository.save(newAlergy);
      return newAlergy;
    } catch (error) {
      throw new HttpException(
        'Nešto je pošlo po krivu',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.alergyRepository.find({
      order: { name: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.alergyRepository.findOne(id);
  }

  update(id: number, updateAlergyDto: UpdateAlergyDto) {
    return `This action updates a #${id} alergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} alergy`;
  }
}
