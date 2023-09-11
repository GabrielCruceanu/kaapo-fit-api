import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { Client } from '../../users/entities/client.entity';
import { Nutritionist } from '../../users/entities/nutritionist.entity';
import { EntityHelper } from '../../utils/entity-helper';

export enum AppointmentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Appointment extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trainer, (trainer) => trainer.appointments)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;

  @ManyToOne(
    () => Nutritionist,
    (nutritionist) => nutritionist.nutritionistAppointments,
  )
  @JoinColumn({ name: 'nutritionist_id' })
  nutritionist: Nutritionist;

  @ManyToOne(() => Client, (client) => client.clientAppointments)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;
}
