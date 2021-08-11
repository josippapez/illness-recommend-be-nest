import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  name: string;
  role: string;
  email: string;
}
