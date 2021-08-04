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
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Roles } from 'src/authentication/Roles.decorator';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('users-details')
@UseGuards(RolesGuard)
export class UsersDetailsController {
  constructor(private readonly usersDetailsService: UsersDetailsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createUsersDetailDto: CreateUsersDetailDto) {
    return this.usersDetailsService.create(createUsersDetailDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @Roles('admin')
  findAll() {
    return this.usersDetailsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userDetail = await this.usersDetailsService.findOne(id);
    if (userDetail) {
      return userDetail;
    }
    return 'null';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch()
  async update(@Body() createUsersDetailDto: CreateUsersDetailDto) {
    const userDetail = this.usersDetailsService.update(createUsersDetailDto);
    if (userDetail) {
      return userDetail;
    }
    return 'null';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersDetailsService.remove(id);
  }
}
