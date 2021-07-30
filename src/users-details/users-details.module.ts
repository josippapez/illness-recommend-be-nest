import { Module } from '@nestjs/common';
import { UsersDetailsService } from './users-details.service';
import { UsersDetailsController } from './users-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDetail } from './entities/users-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDetail])],
  exports: [UsersDetailsService],
  controllers: [UsersDetailsController],
  providers: [UsersDetailsService],
})
export class UsersDetailsModule {}
