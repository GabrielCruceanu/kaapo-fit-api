import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Trainer } from './trainer.entity';
import { Client } from './client.entity';

@Entity()
export class TrainingSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trainer, (trainer) => trainer.trainingSessionsAsTrainer)
  @JoinColumn({ name: 'trainer_id' })
  trainer: User;

  @ManyToOne(() => Client, (client) => client.trainingSessionsAsClient)
  @JoinColumn({ name: 'student_id' })
  client: Client;

  @Column()
  startDate: Date;
}
