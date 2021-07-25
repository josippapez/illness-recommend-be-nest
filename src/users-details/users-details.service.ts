import { Injectable } from '@nestjs/common';
import { CreateUsersDetailDto } from './dto/create-users-detail.dto';
import { UpdateUsersDetailDto } from './dto/update-users-detail.dto';

@Injectable()
export class UsersDetailsService {
  create(createUsersDetailDto: CreateUsersDetailDto) {
    return 'This action adds a new usersDetail';
  }

  findAll() {
    return `This action returns all usersDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersDetail`;
  }

  update(id: number, updateUsersDetailDto: UpdateUsersDetailDto) {
    return `This action updates a #${id} usersDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersDetail`;
  }
}
