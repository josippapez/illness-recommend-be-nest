import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { Symptom } from './entities/symptom.entity';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom)
    private symptomRepository: Repository<Symptom>,
  ) {}

  create(createSymptomDto: CreateSymptomDto) {
    return 'This action adds a new symptom';
  }

  findAll() {
    return this.symptomRepository.find({
      order: { name: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} symptom`;
  }

  update(id: number, updateSymptomDto: UpdateSymptomDto) {
    return `This action updates a #${id} symptom`;
  }

  remove(id: number) {
    return `This action removes a #${id} symptom`;
  }
}
