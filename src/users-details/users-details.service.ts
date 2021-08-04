import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDetailDto } from './dto/create-users-detail.dto';
import { UsersDetail } from './entities/users-detail.entity';
import * as Joi from '@hapi/joi';

@Injectable()
export class UsersDetailsService {
  constructor(
    @InjectRepository(UsersDetail)
    private userDetailsRepository: Repository<UsersDetail>,
  ) {}

  serializer = Joi.object({
    id: Joi.not(null).required(),
    alergies: Joi.array(),
    age: Joi.not(null).required(),
    weight: Joi.not(null).required(),
    pregnantOrBreastFeed: Joi.boolean().required(),
  }).messages({
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  async create(createUsersDetailDto: CreateUsersDetailDto) {
    const result = this.serializer.validate(createUsersDetailDto, {
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
      const newUserDetail = await this.userDetailsRepository.save(
        createUsersDetailDto,
      );
      if (newUserDetail) {
        return {
          ...newUserDetail,
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
    return this.userDetailsRepository.find();
  }

  async findOne(id: number) {
    return await this.userDetailsRepository.findOne(id, {
      relations: ['alergies'],
    });
  }

  async update(createUsersDetailDto: CreateUsersDetailDto) {
    const newUserDetail = await this.userDetailsRepository.save(
      createUsersDetailDto,
    );

    if (newUserDetail) {
      return { successMessage: 'Promjene uspješno spremljene' };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} usersDetail`;
  }
}
