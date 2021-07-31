import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alergy {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;
}
