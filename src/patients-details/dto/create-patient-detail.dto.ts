import { Alergy } from 'src/alergies/entities/alergy.entity';

export class CreatePatientsDetailDto {
  userId: number;
  oib: string;
  name: string;
  age: number;
  weight: number;
  pregnantOrBreastFeed: boolean;
  alergies: Alergy[];
}
