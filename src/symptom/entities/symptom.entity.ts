import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Medication } from '../../medications/entities/medication.entity';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @ManyToMany(() => Medication, (medications) => medications.symptoms)
  medications: Medication[];
}
