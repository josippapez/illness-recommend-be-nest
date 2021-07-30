import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDetailDto } from './dto/create-users-detail.dto';
import { UpdateUsersDetailDto } from './dto/update-users-detail.dto';
import { UsersDetail } from './entities/users-detail.entity';

@Injectable()
export class UsersDetailsService {
  constructor(
    @InjectRepository(UsersDetail)
    private userDetailsRepository: Repository<UsersDetail>,
  ) {}

  create(createUsersDetailDto: CreateUsersDetailDto) {
    const newUserDetail =
      this.userDetailsRepository.create(createUsersDetailDto);
    if (newUserDetail) {
      return newUserDetail;
    } else {
      throw new Error('Greška pri spremanju');
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

  update(id: number, updateUsersDetailDto: UpdateUsersDetailDto) {
    return this.userDetailsRepository.update(id, updateUsersDetailDto);
  }

  remove(id: number) {
    return `This action removes a #${id} usersDetail`;
  }
}
