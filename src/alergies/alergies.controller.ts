import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { AlergiesService } from './alergies.service';

@Controller('alergies')
export class AlergiesController {
  constructor(private readonly alergiesService: AlergiesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.alergiesService.findAll();
  }
}
