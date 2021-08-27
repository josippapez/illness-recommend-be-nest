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
  Query,
} from '@nestjs/common';
import { PatientDetailsService } from './patient-details.service';
import { CreatePatientsDetailDto } from './dto/create-patient-detail.dto';
import { RolesGuard } from '../authentication/Roles.Guard';
import { Roles } from '../authentication/Roles.decorator';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { UpdatePatientsDetailDto } from './dto/update-patient-detail.dto';

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
  @Get('/forUser')
  @Roles('user')
  findAllByUserId(@Req() request: RequestWithUser) {
    return this.patientsDetailsService.findAllByUserId(request.user.id);
  }

  @Get('/search')
  @UseGuards(JwtAuthenticationGuard)
  getByText(@Req() request: RequestWithUser, @Query('search') search) {
    return this.patientsDetailsService.getByText(search, request.user);
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
  async update(@Body() updatePatientsDetailDto: UpdatePatientsDetailDto) {
    const patientDetail = this.patientsDetailsService.update(
      updatePatientsDetailDto,
    );
    if (patientDetail) {
      return patientDetail;
    }
    return 'null';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('/delete')
  @Roles('admin')
  remove(
    @Body()
    id: number,
  ) {
    return this.patientsDetailsService.remove(id);
  }
}
