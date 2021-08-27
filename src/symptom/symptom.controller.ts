import { Controller, Get, UseGuards } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.symptomService.findAll();
  }
}
