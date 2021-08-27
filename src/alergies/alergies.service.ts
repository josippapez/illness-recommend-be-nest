import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alergy } from './entities/alergy.entity';

@Injectable()
export class AlergiesService {
  constructor(
    @InjectRepository(Alergy)
    private alergyRepository: Repository<Alergy>,
  ) {}

  findAll() {
    return this.alergyRepository.find({
      order: { name: 'ASC' },
    });
  }
}
