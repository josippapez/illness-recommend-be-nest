import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import JwtRefreshGuard from 'src/authentication/jwt-refresh.guard';
import { Roles } from 'src/authentication/Roles.decorator';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('medications')
@UseGuards(RolesGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/find-by-symptoms')
  findBySymptoms(@Body() symptoms: Symptom[], @Req() user: RequestWithUser) {
    return this.medicationsService.findBySymptoms(symptoms, user.user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles('admin')
  @Patch()
  async update(@Body() createMedicationDto: CreateMedicationDto) {
    return await this.medicationsService.update(createMedicationDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('/delete')
  @Roles('admin')
  remove(@Body() id: number) {
    return this.medicationsService.remove(id);
  }
}
