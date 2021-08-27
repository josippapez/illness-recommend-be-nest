/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AlergiesService } from './alergies.service';
import { AlergiesController } from './alergies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alergy } from './entities/alergy.entity';
import { UsersService } from '../users/users.service';
import User from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alergy]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AlergiesService],
  controllers: [AlergiesController],
  providers: [AlergiesService, UsersService],
})
export class AlergiesModule {}
