import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meal } from './meal.entity';
import { Nutritionist } from '../../users/entities/nutritionist.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { Trainer } from '../../trainer/entities/trainer.entity';

@Entity()
export class Diet extends EntityHelper {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.dietPlans)
  @JoinColumn({ name: 'nutritionist_id' })
  nutritionist: Nutritionist | null;

  @ManyToOne(() => Trainer, (trainer) => trainer.dietPlans)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer | null;

  @Column() name: string;

  @Column() description: string;

  @Column() totalCalories: number;

  @Column() proteinGrams: number;

  @Column() carbohydrateGrams: number;

  @Column() fatGrams: number;

  @OneToMany(() => Meal, (meal) => meal.dietPlan) meals: Meal[];
}
