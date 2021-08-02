import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from './entities/symptom.entity';
import User from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Symptom]),
    /*  TypeOrmModule.forFeature([User]), */
  ],
  exports: [SymptomService],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}