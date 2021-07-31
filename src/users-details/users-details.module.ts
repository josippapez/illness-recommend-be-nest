import { Module } from '@nestjs/common';
import { UsersDetailsService } from './users-details.service';
import { UsersDetailsController } from './users-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDetail } from './entities/users-detail.entity';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersDetail]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersDetailsService],
  controllers: [UsersDetailsController],
  providers: [UsersDetailsService, UsersService],
})
export class UsersDetailsModule {}
