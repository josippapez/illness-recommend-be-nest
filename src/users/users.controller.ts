import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Roles } from 'src/authentication/Roles.decorator';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import CreateUserDto from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @Roles('admin')
  getAll(@Req() request: RequestWithUser) {
    return this.usersService.getAllUsers(request.user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    const patientDetail = this.usersService.getById(id);
    if (patientDetail) {
      return patientDetail;
    }
    return 'null';
  }

  @Get('/search')
  @UseGuards(JwtAuthenticationGuard)
  @Roles('admin')
  getByText(@Req() request: RequestWithUser, @Query('search') search) {
    return this.usersService.getByText(request.user.id, search);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthenticationGuard)
  @Roles('admin')
  remove(
    @Body()
    id: number,
  ) {
    return this.usersService.delete(id);
  }
}
