import { Alergy } from 'src/alergies/entities/alergy.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @Column()
  public canBeUsedWhilePregnantOrBreastFeed: boolean;
  @Column('text', { array: true })
  public contraindications: string[];
  @Column('text', { array: true })
  public interactions: string[];
  @Column('json')
  public sideEffects: JSON;
  @Column('json', { default: { byAge: [], byWeight: [] } })
  public dosage: JSON;
  @ManyToMany(() => Symptom, (symptom) => symptom.medications, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'medications_symptoms',
    joinColumn: {
      name: 'medicationId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'symptomId',
      referencedColumnName: 'id',
    },
  })
  public symptoms: Symptom[];
  @ManyToMany(() => Alergy, (alergy) => alergy.medications, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'medications_alergies',
    joinColumn: {
      name: 'medicationId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'alergyId',
      referencedColumnName: 'id',
    },
  })
  public alergies: Alergy[];
}
