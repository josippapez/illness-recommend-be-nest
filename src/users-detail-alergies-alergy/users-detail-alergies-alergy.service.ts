import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDetail } from 'src/users-details/entities/users-detail.entity';
import { Repository } from 'typeorm';
import { CreateUsersDetailAlergiesAlergyDto } from './dto/create-users-detail-alergies-alergy.dto';
import { UpdateUsersDetailAlergiesAlergyDto } from './dto/update-users-detail-alergies-alergy.dto';
import { UsersDetailAlergiesAlergy } from './entities/users-detail-alergies-alergy.entity';

@Injectable()
export class UsersDetailAlergiesAlergyService {
  constructor(
    @InjectRepository(UsersDetailAlergiesAlergy)
    private usersDetailAlergiesAlergyRepo: Repository<UsersDetailAlergiesAlergy>,
    @InjectRepository(UsersDetail)
    private usersDetailsRepository: Repository<UsersDetail>,
  ) {}

  async create(
    createUsersDetailAlergiesAlergyDto: CreateUsersDetailAlergiesAlergyDto,
  ) {
    return await this.usersDetailAlergiesAlergyRepo.save(
      createUsersDetailAlergiesAlergyDto,
    );
  }

  findAll() {
    return `This action returns all usersDetailAlergiesAlergy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersDetailAlergiesAlergy`;
  }

  update(
    id: number,
    updateUsersDetailAlergiesAlergyDto: UpdateUsersDetailAlergiesAlergyDto,
  ) {
    return `This action updates a #${id} usersDetailAlergiesAlergy`;
  }

  async remove(
    createUsersDetailAlergiesAlergyDto: CreateUsersDetailAlergiesAlergyDto,
  ) {
    const response = await this.usersDetailAlergiesAlergyRepo.delete(
      createUsersDetailAlergiesAlergyDto,
    );
    if (response) {
      return this.usersDetailsRepository.findOne(
        createUsersDetailAlergiesAlergyDto.usersDetailId,
        {
          relations: ['alergies'],
        },
      );
    }
  }
}
