import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { Roles } from 'src/authentication/Roles.decorator';
import { RolesGuard } from 'src/authentication/Roles.Guard';

@Controller('symptom')
@UseGuards(RolesGuard)
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @Roles('admin')
  create(@Body() createSymptomDto: CreateSymptomDto) {
    return this.symptomService.create(createSymptomDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.symptomService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.symptomService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateSymptomDto: UpdateSymptomDto) {
    return this.symptomService.update(+id, updateSymptomDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.symptomService.remove(+id);
  }
}
