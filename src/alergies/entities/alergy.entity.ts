import { Medication } from '../../medications/entities/medication.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alergy {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @ManyToMany(() => Medication, (medications) => medications.alergies)
  medications: Medication[];
}
