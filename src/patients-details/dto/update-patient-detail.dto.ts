import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientsDetailDto } from './create-patient-detail.dto';

export class UpdatePatientsDetailDto extends PartialType(
  CreatePatientsDetailDto,
) {}
