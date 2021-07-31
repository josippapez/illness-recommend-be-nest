import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { Alergy } from 'src/alergies/entities/alergy.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication]),
    TypeOrmModule.forFeature([Alergy]),
    TypeOrmModule.forFeature([Symptom]),
  ],
  exports: [MedicationsService],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
