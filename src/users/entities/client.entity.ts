import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkoutGoal } from '../../workout/workout.enum';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { TrainingSession } from '../../trainer/entities/training-session.entity';
import { Nutritionist } from './nutritionist.entity';
import { Appointment } from '../../appointment/entity/appointment.entity';
import { GenderType } from '../types/gender.enum';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Client extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn()
  user: User;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender: GenderType | null;

  @Column({ type: 'enum', enum: WorkoutGoal, nullable: true })
  fitnessGoal: WorkoutGoal;

  @ManyToOne(() => Trainer, (trainer) => trainer.clients)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  clientAppointments: Appointment[] | null;

  @Column({ type: 'uuid', nullable: true })
  currentWorkoutPlanId: string;

  @Column({ type: 'uuid', nullable: true })
  currentNutritionPlanId: string;

  // represents training sessions where the user is the student
  @OneToMany(() => TrainingSession, (trainingSession) => trainingSession.client)
  trainingSessionsAsClient: TrainingSession[] | null;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.clients)
  @JoinColumn({ name: 'nutritionist_id' })
  nutritionist: Nutritionist;
}
