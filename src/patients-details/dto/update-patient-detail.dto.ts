import { PartialType } from '@nestjs/mapped-types';
import { Alergy } from '../../alergies/entities/alergy.entity';
import { CreatePatientsDetailDto } from './create-patient-detail.dto';

export class UpdatePatientsDetailDto extends PartialType(
  CreatePatientsDetailDto,
) {
  oib: string;
  name: string;
  age: number;
  weight: number;
  pregnantOrBreastFeed: boolean;
  alergies: Alergy[];
  id: number;
  created: string;
  medicationsSelected: [];
  symptomsSelected: [];
}
