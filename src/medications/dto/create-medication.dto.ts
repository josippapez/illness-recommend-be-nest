import { Symptom } from 'src/symptom/entities/symptom.entity';

export class CreateMedicationDto {
  id: number;
  name: string;
  description: string;
  canBeUsedWhilePregnantOrBreastFeed: boolean;
  contraindications: string[];
  sideEffects: JSON;
  symptoms: Symptom[];
  alergies: { name: string }[];
}
