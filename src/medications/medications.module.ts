/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { Alergy } from '../alergies/entities/alergy.entity';
import { Symptom } from '../symptom/entities/symptom.entity';
import User from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication]),
    TypeOrmModule.forFeature([Alergy]),
    TypeOrmModule.forFeature([Symptom]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [MedicationsService],
  controllers: [MedicationsController],
  providers: [MedicationsService, UsersService],
})
export class MedicationsModule {}
