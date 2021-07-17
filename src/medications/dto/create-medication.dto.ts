export class CreateMedicationDto {
  name: string;
  description: string;
  indications: string;
  contraindications: string;
  sideEffects: string[];
  symptoms: string[];
}
