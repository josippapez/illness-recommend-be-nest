import { Symptom } from '../../symptom/entities/symptom.entity';

export class CreateMedicationDto {
  id: number;
  name: string;
  description: string;
  canBeUsedWhilePregnantOrBreastFeed: boolean;
  contraindications: string[];
  interactions: string[];
  sideEffects: JSON;
  dosage: JSON;
  symptoms: Symptom[];
  alergies: { name: string }[];
}
