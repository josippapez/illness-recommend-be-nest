import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, getConnection, Not, Repository } from 'typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';
import * as Joi from '@hapi/joi';
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
          qb.where('LOWER(user.name) like (:name)', {
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
    const user = await this.usersRepository.findOne({ id });
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
