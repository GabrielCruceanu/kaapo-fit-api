import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Client } from './client.entity';
import { Diet } from '../../diet/entity/diet.entity';
import { Appointment } from '../../appointment/entity/appointment.entity';
import { NutritionistType } from '../types/nutritionist.enum';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Nutritionist extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.nutritionist)
  @JoinColumn()
  user: User;

  @Column({ type: 'enum', enum: NutritionistType, nullable: true })
  expertise: NutritionistType;

  @Column()
  experience: number;

  @Column({ type: String, nullable: true })
  bio: string;

  @OneToMany(() => Client, (client) => client.nutritionist)
  clients: Client[];

  @OneToMany(() => Diet, (diet) => diet.nutritionist)
  dietPlans: Diet[];

  @OneToMany(() => Appointment, (appointment) => appointment.nutritionist)
  nutritionistAppointments: Appointment[] | null;
}
