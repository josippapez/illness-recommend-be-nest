import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './entities/medication.entity';
import * as Joi from '@hapi/joi';
import { Alergy } from 'src/alergies/entities/alergy.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';
@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
    @InjectRepository(Alergy)
    private alergyRepository: Repository<Alergy>,
    @InjectRepository(Symptom)
    private symptomRepository: Repository<Symptom>,
  ) {}

  serializer = Joi.object({
    name: Joi.string().not(null).required(),
    description: Joi.string().not(null).required(),
    contraindications: Joi.array().required(),
    sideEffects: Joi.object().required(),
    symptoms: Joi.array().required(),
    alergies: Joi.array(),
  }).messages({
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  async create(createMedicationDto: CreateMedicationDto) {
    if (
      await this.medicationRepository.findOne({
        name: createMedicationDto.name,
      })
    ) {
      throw new HttpException(
        { message: 'Lijek s ovim nazivom već postoji', field: 'name' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = this.serializer.validate(createMedicationDto, {
      abortEarly: false,
    });

    if (result.error) {
      const arrayOfErrors = [
        ...result.error.details.map((error) => {
          return { message: error.message, field: error.path[0] };
        }),
      ];
      throw new HttpException(arrayOfErrors, HttpStatus.BAD_REQUEST);
    }
    createMedicationDto.alergies.map(async (alergy) => {
      if (!this.alergyRepository.find({ name: alergy.name })) {
        await this.alergyRepository.save({ name: alergy.name });
      }
    });
    createMedicationDto.symptoms.map(async (symptom) => {
      if (!this.symptomRepository.find({ name: symptom.name })) {
        await this.symptomRepository.save({ name: symptom.name });
      }
    });
    const newMedication = this.medicationRepository.create(createMedicationDto);
    await this.medicationRepository.save(newMedication);
    return newMedication;
  }

  async findAll() {
    const medications = await this.medicationRepository.find();
    if (medications) {
      return medications;
    }
    throw new HttpException(
      'Ne postoje uneseni lijekovi',
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: number) {
    const Medication = await this.medicationRepository.findOne({ id });
    if (Medication) {
      return Medication;
    }
    throw new HttpException(
      'Lijek sa ovom oznakom ne postoji',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(createMedicationDto: CreateMedicationDto) {
    console.log(createMedicationDto);

    const updatedMedication = await this.medicationRepository.save(
      createMedicationDto,
    );

    if (updatedMedication) {
      return 'Promjene uspješno spremljene';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
