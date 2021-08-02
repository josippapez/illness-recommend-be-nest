import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
    });
    if (users) {
      return users;
    }
    throw new HttpException(
      'Ne postoje uneseni korisnici',
      HttpStatus.NOT_FOUND,
    );
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
