import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersDetailsService } from './users-details.service';
import { CreateUsersDetailDto } from './dto/create-users-detail.dto';
import { UpdateUsersDetailDto } from './dto/update-users-detail.dto';

@Controller('users-details')
export class UsersDetailsController {
  constructor(private readonly usersDetailsService: UsersDetailsService) {}

  @Post()
  create(@Body() createUsersDetailDto: CreateUsersDetailDto) {
    return this.usersDetailsService.create(createUsersDetailDto);
  }

  @Get()
  findAll() {
    return this.usersDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userDetail = await this.usersDetailsService.findOne(id);
    if (userDetail) {
      return userDetail;
    }
    return 'null';
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUsersDetailDto: UpdateUsersDetailDto,
  ) {
    const userDetail = this.usersDetailsService.update(
      id,
      updateUsersDetailDto,
    );
    if (userDetail) {
      return userDetail;
    }
    return 'null';
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersDetailsService.remove(id);
  }
}
