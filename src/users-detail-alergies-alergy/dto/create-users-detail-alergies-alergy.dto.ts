import { Alergy } from 'src/alergies/entities/alergy.entity';
import { UsersDetail } from 'src/users-details/entities/users-detail.entity';

export class CreateUsersDetailAlergiesAlergyDto {
  usersDetailId: number;
  alergyId: number;
}
