import { Alergy } from 'src/alergies/entities/alergy.entity';

export class CreatePatientsDetailDto {
  oib: number;
  name: string;
  age: number;
  weight: number;
  pregnantOrBreastFeed: boolean;
  alergies: Alergy[];
}
