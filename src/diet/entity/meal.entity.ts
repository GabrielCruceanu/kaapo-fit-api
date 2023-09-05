import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diet } from './diet.entity';
import { FoodItem } from './food-item.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Meal extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalCalories: number;

  @Column()
  proteinGrams: number;

  @Column()
  carbohydrateGrams: number;

  @Column()
  fatGrams: number;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.meal)
  foodItems: FoodItem[];

  @ManyToMany(() => Diet, (nutrition) => nutrition.meals)
  dietPlan: Diet[];
}
