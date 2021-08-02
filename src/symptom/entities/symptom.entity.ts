import { Medication } from 'src/medications/entities/medication.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @ManyToMany(() => Medication, (medications) => medications.symptoms)
  medications: Medication[];
}
