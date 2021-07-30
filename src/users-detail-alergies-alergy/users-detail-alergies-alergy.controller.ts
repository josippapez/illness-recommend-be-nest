import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersDetailAlergiesAlergyService } from './users-detail-alergies-alergy.service';
import { CreateUsersDetailAlergiesAlergyDto } from './dto/create-users-detail-alergies-alergy.dto';
import { UpdateUsersDetailAlergiesAlergyDto } from './dto/update-users-detail-alergies-alergy.dto';
import { UsersDetailsService } from 'src/users-details/users-details.service';

@Controller('users-detail-alergies-alergy')
export class UsersDetailAlergiesAlergyController {
  constructor(
    private readonly usersDetailAlergiesAlergyService: UsersDetailAlergiesAlergyService,
  ) {}

  @Post()
  create(
    @Body()
    createUsersDetailAlergiesAlergyDto: CreateUsersDetailAlergiesAlergyDto,
  ) {
    return this.usersDetailAlergiesAlergyService.create(
      createUsersDetailAlergiesAlergyDto,
    );
  }

  @Get()
  findAll() {
    return this.usersDetailAlergiesAlergyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersDetailAlergiesAlergyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body()
    updateUsersDetailAlergiesAlergyDto: UpdateUsersDetailAlergiesAlergyDto,
  ) {
    return this.usersDetailAlergiesAlergyService.update(
      +id,
      updateUsersDetailAlergiesAlergyDto,
    );
  }

  @Delete('/delete')
  remove(
    @Body()
    createUsersDetailAlergiesAlergyDto: CreateUsersDetailAlergiesAlergyDto,
  ) {
    return this.usersDetailAlergiesAlergyService.remove(
      createUsersDetailAlergiesAlergyDto,
    );
  }
}
