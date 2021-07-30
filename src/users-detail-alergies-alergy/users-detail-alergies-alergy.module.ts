import { Module } from '@nestjs/common';
import { UsersDetailAlergiesAlergyService } from './users-detail-alergies-alergy.service';
import { UsersDetailAlergiesAlergyController } from './users-detail-alergies-alergy.controller';
import { UsersDetailAlergiesAlergy } from './entities/users-detail-alergies-alergy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDetail } from 'src/users-details/entities/users-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersDetailAlergiesAlergy]),
    TypeOrmModule.forFeature([UsersDetail]),
  ],
  exports: [UsersDetailAlergiesAlergyService],
  controllers: [UsersDetailAlergiesAlergyController],
  providers: [UsersDetailAlergiesAlergyService],
})
export class UsersDetailAlergiesAlergyModule {}
