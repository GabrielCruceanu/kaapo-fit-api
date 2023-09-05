import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Exercise extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sets: number;

  @Column()
  repetitions: number;

  @Column()
  restTime: number;

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts: Workout[];
}
