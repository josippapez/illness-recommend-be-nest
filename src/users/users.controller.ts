import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Roles } from 'src/authentication/Roles.decorator';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

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
