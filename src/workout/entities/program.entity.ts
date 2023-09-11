import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Program extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => Trainer, (trainer) => trainer.programs)
  trainer: Trainer;
}
