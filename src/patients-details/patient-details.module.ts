import { Module } from '@nestjs/common';
import { PatientDetailsService } from './patient-details.service';
import { PatientsDetailsController } from './patient-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientDetail } from './entities/patient-detail.entity';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientDetail]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [PatientDetailsService],
  controllers: [PatientsDetailsController],
  providers: [PatientDetailsService, UsersService],
})
export class PatientDetailsModule {}
