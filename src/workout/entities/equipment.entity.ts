import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Equipment extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Trainer, (trainer) => trainer.equipment)
  trainers: Trainer[];
}
