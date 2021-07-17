import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column({ unique: true })
  public name: string;
  @Column()
  public description: string;
  @Column()
  public indications: string;
  @Column()
  public contraindications: string;
  @Column('text', { array: true })
  public sideEffects: string[];
  @Column('text', { array: true })
  public symptoms: string[];
}
