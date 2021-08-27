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
import { RolesGuard } from '../authentication/Roles.Guard';
import { Roles } from '../authentication/Roles.decorator';
import RequestWithUser from '../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
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

  @Get('/search')
  @UseGuards(JwtAuthenticationGuard)
  @Roles('admin')
  getByText(@Req() request: RequestWithUser, @Query('search') search) {
    return this.usersService.getByText(request.user.id, search);
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
