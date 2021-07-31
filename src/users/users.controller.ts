import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import JwtRefreshGuard from '../authentication/jwt-refresh.guard';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Roles } from 'src/authentication/Roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtRefreshGuard)
  @Roles('admin')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Delete('/delete')
  @UseGuards(JwtRefreshGuard)
  @Roles('admin')
  remove(
    @Body()
    id: number,
  ) {
    return this.usersService.delete(id);
  }
}
