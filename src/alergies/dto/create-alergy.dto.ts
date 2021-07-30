import { UsersDetail } from 'src/users-details/entities/users-detail.entity';

export class CreateAlergyDto {
  id: number;
  name: string;
  userDetailsIds: number[];
}
