import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutType } from '../../workout/workout.enum';
import { Client } from './client.entity';
import { Workout } from '../../workout/entities/workout.entity';
import { TrainingSession } from './training-session.entity';
import { Nutritionist } from './nutritionist.entity';
import { Appointment } from '../../appointment/entity/appointment.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Trainer extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.trainer)
  @JoinColumn()
  user: User;

  @Column({ type: 'enum', enum: WorkoutType, nullable: true })
  expertise: WorkoutType;

  @Column()
  experience: number;

  @Column({ type: String, nullable: true }) bio: string;

  @OneToMany(() => Client, (client) => client.trainer)
  clients: Client[];

  @OneToMany(() => Workout, (workout) => workout.trainer)
  workoutPlans: Workout[];

  // represents training sessions where the user is the trainer
  @OneToMany(
    () => TrainingSession,
    (trainingSession) => trainingSession.trainer,
  )
  trainingSessionsAsTrainer: TrainingSession[] | null;

  @OneToMany(() => Appointment, (appointment) => appointment.trainer)
  trainerAppointments: Appointment[] | null;

  @OneToOne(() => Nutritionist, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  nutritionist?: Nutritionist;
}
