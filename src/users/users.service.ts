import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, getConnection, Not, Repository } from 'typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';
import * as Joi from '@hapi/joi';
import { UpdateUserDto } from './dto/updateUser.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  serializer = Joi.object({
    id: Joi.not(null).required(),
  }).messages({
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  updateSerializer = Joi.object({
    id: Joi.number(),
    name: Joi.string().not(null).required(),
    email: Joi.string().email().not(null).required(),
    role: Joi.string().not(null).required(),
  }).messages({
    'number.base': 'Vrijednost mora biti broj',
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.email': 'Email nije ispravnog formata',
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  async getAllUsers(userId: number) {
    const users = await this.usersRepository.find({
      where: {
        id: Not(userId),
        role: Not('admin'),
      },
      order: { name: 'ASC' },
      select: ['email', 'id', 'name', 'role'],
    });
    if (users) {
      return users;
    }
    throw new HttpException(
      'Ne postoje uneseni korisnici',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByText(userId: number, search: string) {
    const users = getConnection()
      .createQueryBuilder()
      .select(['user.id', 'user.name', 'user.email', 'user.role'])
      .from(User, 'user')
      .where('user.id != :userId', { userId })
      .andWhere('user.role != :role', { role: 'admin' })
      .andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(user.name) like LOWER(:name)', {
            name: `%${search}%`,
          }).orWhere('LOWER(user.email) like LOWER(:email)', {
            email: `%${search}%`,
          });
        }),
      )
      .orderBy('user.name', 'ASC')
      .getMany();
    if (users) {
      return users;
    }
    throw new HttpException('Nema pronađenih korisnika', HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne(
      { id },
      { select: ['id', 'email', 'name', 'role'] },
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(updateUserDto: UpdateUserDto) {
    const result = this.updateSerializer.validate(updateUserDto, {
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
    const updatedUser = await this.usersRepository.save(updateUserDto);
    if (updatedUser) {
      return { successMessage: 'Promjene uspješno spremljene' };
    }
  }

  async delete(id: number) {
    const result = this.serializer.validate(id, {
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

    const response = await this.usersRepository.delete(id);
    if (response) {
      return { successMessage: 'Korisnik uspješno obrisan' };
    }
  }
}
