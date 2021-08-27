import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Symptom } from './entities/symptom.entity';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom)
    private symptomRepository: Repository<Symptom>,
  ) {}

  findAll() {
    return this.symptomRepository.find({
      order: { name: 'ASC' },
    });
  }
}
