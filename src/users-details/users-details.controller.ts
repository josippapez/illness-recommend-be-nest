import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersDetailsService } from './users-details.service';
import { CreateUsersDetailDto } from './dto/create-users-detail.dto';
import JwtRefreshGuard from 'src/authentication/jwt-refresh.guard';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Roles } from 'src/authentication/Roles.decorator';

@Controller('users-details')
@UseGuards(RolesGuard)
export class UsersDetailsController {
  constructor(private readonly usersDetailsService: UsersDetailsService) {}

  @UseGuards(JwtRefreshGuard)
  @Post()
  create(@Body() createUsersDetailDto: CreateUsersDetailDto) {
    return this.usersDetailsService.create(createUsersDetailDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get()
  @Roles('admin')
  findAll() {
    return this.usersDetailsService.findAll();
  }

  @UseGuards(JwtRefreshGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userDetail = await this.usersDetailsService.findOne(id);
    if (userDetail) {
      return userDetail;
    }
    return 'null';
  }

  @UseGuards(JwtRefreshGuard)
  @Patch()
  async update(@Body() createUsersDetailDto: CreateUsersDetailDto) {
    const userDetail = this.usersDetailsService.update(createUsersDetailDto);
    if (userDetail) {
      return userDetail;
    }
    return 'null';
  }

  @UseGuards(JwtRefreshGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersDetailsService.remove(id);
  }
}
