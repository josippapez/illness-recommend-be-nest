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
import JwtRefreshGuard from 'src/authentication/jwt-refresh.guard';
import { Roles } from 'src/authentication/Roles.decorator';
import { RolesGuard } from 'src/authentication/Roles.Guard';
import { AlergiesService } from './alergies.service';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';

@Controller('alergies')
@UseGuards(RolesGuard)
export class AlergiesController {
  constructor(private readonly alergiesService: AlergiesService) {}

  @UseGuards(JwtRefreshGuard)
  @Post()
  create(@Body() createAlergyDto: CreateAlergyDto) {
    return this.alergiesService.create(createAlergyDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get()
  findAll() {
    return this.alergiesService.findAll();
  }

  @UseGuards(JwtRefreshGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alergiesService.findOne(+id);
  }

  @UseGuards(JwtRefreshGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlergyDto: UpdateAlergyDto) {
    return this.alergiesService.update(+id, updateAlergyDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.alergiesService.remove(+id);
  }
}
