import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Trainer } from '../../trainer/entities/trainer.entity';

@Entity()
export class Address extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Trainer, (trainer) => trainer.address)
  trainer: Trainer;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column({ nullable: true })
  country: string;
}
