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
  findOne(@Param('id') id: string) {
    return this.usersDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersDetailDto: UpdateUsersDetailDto,
  ) {
    return this.usersDetailsService.update(+id, updateUsersDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersDetailsService.remove(+id);
  }
}
