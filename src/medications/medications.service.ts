import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, In, Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { Medication } from './entities/medication.entity';
import * as Joi from '@hapi/joi';
import { Alergy } from 'src/alergies/entities/alergy.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import { PatientDetail } from 'src/patients-details/entities/patient-detail.entity';

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
    canBeUsedWhilePregnantOrBreastFeed: Joi.boolean().not(null),
    contraindications: Joi.array().required(),
    interactions: Joi.array().required(),
    sideEffects: Joi.object().required(),
    symptoms: Joi.array().required(),
    alergies: Joi.array(),
    dosage: Joi.object().required(),
  }).messages({
    'string.base': `Vrijednost nije pravilnog formata`,
    'string.empty': `Polje je obavezno`,
    'any.required': `Polje je obavezno`,
    'any.invalid': 'Polje je obavezno',
  });

  serializerForDelete = Joi.object({
    id: Joi.not(null).required(),
  }).messages({
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
        await this.alergyRepository.save(alergy);
      }
    });
    createMedicationDto.symptoms.map(async (symptom) => {
      if (!this.symptomRepository.find({ name: symptom.name })) {
        await this.symptomRepository.save({ name: symptom.name });
      }
    });
    const newMedication = this.medicationRepository.create(createMedicationDto);
    await this.medicationRepository.save(newMedication);
    return { ...newMedication, successMessage: 'Lijek uspješno kreiran' };
  }

  async findAll() {
    const medications = await this.medicationRepository.find({
      order: { name: 'ASC' },
    });
    if (medications) {
      return medications;
    }
    throw new HttpException(
      'Ne postoje uneseni lijekovi',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByText(search: string) {
    const medications = getConnection()
      .createQueryBuilder()
      .select('medication')
      .from(Medication, 'medication')
      .where('LOWER(medication.description) like LOWER(:description)', {
        description: `%${search}%`,
      })
      .orWhere('LOWER(medication.name) like LOWER(:name)', {
        name: `%${search}%`,
      })
      .orderBy('medication.name', 'ASC')
      .getMany();
    if (medications) {
      return medications;
    }
    throw new HttpException('Nema pronađenih lijekova', HttpStatus.NOT_FOUND);
  }

  async findBySymptoms(symptoms: Symptom[], userId: number) {
    const patientDetails = await getManager()
      .getRepository(PatientDetail)
      .findOne({ id: userId });

    const alergiesByName = [
      ...patientDetails.alergies.map(
        (patientDetailAlergy) => patientDetailAlergy.name,
      ),
    ];
    if (symptoms && symptoms.length) {
      const symptomsFound = await this.symptomRepository.findByIds(
        [...symptoms.map((requestSymptom) => requestSymptom.id)],
        { relations: ['medications'] },
      );
      const extractedMedicationsFromSymptoms = symptomsFound.map(
        (symptom) => symptom.medications,
      );
      const flattenedArrayOfMedications = [].concat(
        [],
        ...extractedMedicationsFromSymptoms,
      );

      const uniq = flattenedArrayOfMedications
        .map((medication) => {
          return { count: 1, medication: medication };
        })
        .reduce((a, b) => {
          a[b.medication.name] = (a[b.medication.name] || 0) + b.count;
          return a;
        }, {});

      const sorted = Object.keys(uniq).sort((a, b) =>
        uniq[a] > uniq[b] ? -1 : uniq[a] < uniq[b] ? 1 : 0,
      );
      const medications = await this.medicationRepository.find({
        where: { name: In(sorted) },
      });
      const sortedMedications = sorted.map((medication) =>
        medications.find((med) => med.name === medication),
      );

      return sortedMedications.filter((medication) =>
        patientDetails.pregnantOrBreastFeed
          ? !medication.alergies.find((medicationAlergy) =>
              alergiesByName.includes(medicationAlergy.name),
            ) &&
            medication.canBeUsedWhilePregnantOrBreastFeed &&
            medication
          : !medication.alergies.find((medicationAlergy) =>
              alergiesByName.includes(medicationAlergy.name),
            ) && medication,
      );
    } else {
      const medications = await this.medicationRepository.find();
      return medications.filter((medication) =>
        patientDetails.pregnantOrBreastFeed
          ? !medication.alergies.find((medicationAlergy) =>
              alergiesByName.includes(medicationAlergy.name),
            ) &&
            medication.canBeUsedWhilePregnantOrBreastFeed &&
            medication
          : !medication.alergies.find((medicationAlergy) =>
              alergiesByName.includes(medicationAlergy.name),
            ) && medication,
      );
    }
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
    const updatedMedication = await this.medicationRepository.save(
      createMedicationDto,
    );
    if (updatedMedication) {
      this.removeUnusedAlergies();
      this.removeUnusedSymptoms();
      return { successMessage: 'Promjene uspješno spremljene' };
    }
  }

  async remove(id: number) {
    const result = this.serializerForDelete.validate(id, {
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

    const response = await this.medicationRepository.delete(id);
    if (response) {
      this.removeUnusedAlergies();
      this.removeUnusedSymptoms();
      return { successMessage: 'Lijek uspješno obrisan' };
    }
  }

  async removeUnusedSymptoms() {
    const symptoms = await this.symptomRepository.find({
      relations: ['medications'],
    });
    const arrayOfSymptomsIds = [];
    symptoms.filter((symptom) => {
      if (symptom.medications.length === 0) {
        arrayOfSymptomsIds.push(symptom.id);
      }
    });
    if (arrayOfSymptomsIds.length) {
      await this.symptomRepository.delete(arrayOfSymptomsIds);
    }
  }

  async removeUnusedAlergies() {
    const alergies = await this.alergyRepository.find({
      relations: ['medications'],
    });
    const arrayOfAlergiesIds = [];
    alergies.filter((alergy) => {
      if (alergy.medications.length === 0) {
        arrayOfAlergiesIds.push(alergy.id);
      }
    });
    if (arrayOfAlergiesIds.length) {
      await this.alergyRepository.delete(arrayOfAlergiesIds);
    }
  }
}
