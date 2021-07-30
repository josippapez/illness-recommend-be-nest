import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';
import { Alergy } from './entities/alergy.entity';

@Injectable()
export class AlergiesService {
  constructor(
    @InjectRepository(Alergy)
    private alergyRepository: Repository<Alergy>,
  ) {}

  create(createAlergyDto: CreateAlergyDto) {
    return 'This action adds a new alergy';
  }

  findAll() {
    return this.alergyRepository.find();
  }

  findOne(id: number) {
    return this.alergyRepository.findOne(id);
  }

  update(id: number, updateAlergyDto: UpdateAlergyDto) {
    return `This action updates a #${id} alergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} alergy`;
  }
}
