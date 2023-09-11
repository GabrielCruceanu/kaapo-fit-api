import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';
import { WorkoutGoal, WorkoutSkillLevel, WorkoutType } from '../workout.enum';
import { Client } from '../../users/entities/client.entity';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Workout extends EntityHelper {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Trainer, (trainer) => trainer.workouts)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;

  @Column() name: string;

  @Column() description: string;

  @Column() duration: number;

  @Column() day: number;

  @Column({ type: 'enum', enum: WorkoutGoal, default: WorkoutGoal.STRENGTH })
  goal: WorkoutGoal;

  @Column({
    type: 'enum',
    enum: WorkoutSkillLevel,
    default: WorkoutSkillLevel.BEGINNER,
  })
  skillLevel: WorkoutSkillLevel;

  @Column({
    type: 'enum',
    enum: WorkoutType,
    default: WorkoutType.STRENGTH,
  })
  type: WorkoutType;

  @Column() daysPerWeek: number;

  @ManyToMany(() => Exercise, (exercise) => exercise.workouts)
  @JoinTable()
  exercises: Exercise[];

  @OneToMany(() => Client, (client) => client.currentWorkoutPlanId)
  clients: Client[];
}
