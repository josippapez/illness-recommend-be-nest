/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from './entities/symptom.entity';
import User from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Symptom]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [SymptomService],
  controllers: [SymptomController],
  providers: [SymptomService, UsersService],
})
export class SymptomModule {}
