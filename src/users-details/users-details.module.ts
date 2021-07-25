import { Module } from '@nestjs/common';
import { UsersDetailsService } from './users-details.service';
import { UsersDetailsController } from './users-details.controller';

@Module({
  controllers: [UsersDetailsController],
  providers: [UsersDetailsService]
})
export class UsersDetailsModule {}
