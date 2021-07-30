import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlergiesService } from './alergies.service';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';

@Controller('alergies')
export class AlergiesController {
  constructor(private readonly alergiesService: AlergiesService) {}

  @Post()
  create(@Body() createAlergyDto: CreateAlergyDto) {
    return this.alergiesService.create(createAlergyDto);
  }

  @Get()
  findAll() {
    return this.alergiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alergiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlergyDto: UpdateAlergyDto) {
    return this.alergiesService.update(+id, updateAlergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alergiesService.remove(+id);
  }
}
