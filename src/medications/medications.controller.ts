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
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import JwtRefreshGuard from 'src/authentication/jwt-refresh.guard';
import { Roles } from 'src/authentication/Roles.decorator';
import { RolesGuard } from 'src/authentication/Roles.Guard';

@Controller('medications')
@UseGuards(RolesGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @UseGuards(JwtRefreshGuard)
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @UseGuards(JwtRefreshGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @UseGuards(JwtRefreshGuard)
  @Patch()
  async update(@Body() createMedicationDto: CreateMedicationDto) {
    return await this.medicationsService.update(createMedicationDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Delete('/delete')
  @Roles('admin')
  remove(@Body() id: number) {
    return this.medicationsService.remove(id);
  }
}
