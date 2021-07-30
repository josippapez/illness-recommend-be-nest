import { Module } from '@nestjs/common';
import { AlergiesService } from './alergies.service';
import { AlergiesController } from './alergies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alergy } from './entities/alergy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alergy])],
  exports: [AlergiesService],
  controllers: [AlergiesController],
  providers: [AlergiesService],
})
export class AlergiesModule {}
