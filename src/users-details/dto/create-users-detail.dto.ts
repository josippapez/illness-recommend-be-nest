import { Alergy } from 'src/alergies/entities/alergy.entity';

export class CreateUsersDetailDto {
  id: number;
  age: number;
  weight: number;
  pregnantOrBreastFeed: boolean;
  alergies: Alergy[];
}
