import { PartialType } from '@nestjs/mapped-types';
import { CreateAlergyDto } from './create-alergy.dto';

export class UpdateAlergyDto extends PartialType(CreateAlergyDto) {}
