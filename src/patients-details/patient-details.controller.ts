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
import { PatientDetailsService } from './patient-details.service';
import { CreatePatientsDetailDto } from './dto/create-patient-detail.dto';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { Roles } from 'src/authentication/Roles.decorator';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('patients-details')
@UseGuards(RolesGuard)
export class PatientsDetailsController {
  constructor(private readonly patientsDetailsService: PatientDetailsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createPatientsDetailDto: CreatePatientsDetailDto) {
    return this.patientsDetailsService.create(createPatientsDetailDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @Roles('admin')
  findAll() {
    return this.patientsDetailsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const patientDetail = await this.patientsDetailsService.findOne(id);
    if (patientDetail) {
      return patientDetail;
    }
    return 'null';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch()
  async update(@Body() createPatientsDetailDto: CreatePatientsDetailDto) {
    const patientDetail = this.patientsDetailsService.update(
      createPatientsDetailDto,
    );
    if (patientDetail) {
      return patientDetail;
    }
    return 'null';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientsDetailsService.remove(id);
  }
}
