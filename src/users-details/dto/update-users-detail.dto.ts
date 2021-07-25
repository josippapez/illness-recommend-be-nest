import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDetailDto } from './create-users-detail.dto';

export class UpdateUsersDetailDto extends PartialType(CreateUsersDetailDto) {}
