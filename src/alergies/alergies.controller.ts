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
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { Roles } from 'src/authentication/Roles.decorator';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { AlergiesService } from './alergies.service';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';

@Controller('alergies')
@UseGuards(RolesGuard)
export class AlergiesController {
  constructor(private readonly alergiesService: AlergiesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles('admin')
  @Post()
  create(@Body() createAlergyDto: CreateAlergyDto) {
    return this.alergiesService.create(createAlergyDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.alergiesService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alergiesService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateAlergyDto: UpdateAlergyDto) {
    return this.alergiesService.update(+id, updateAlergyDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.alergiesService.remove(+id);
  }
}
