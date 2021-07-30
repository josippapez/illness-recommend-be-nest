import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDetailAlergiesAlergyDto } from './create-users-detail-alergies-alergy.dto';

export class UpdateUsersDetailAlergiesAlergyDto extends PartialType(
  CreateUsersDetailAlergiesAlergyDto,
) {}
