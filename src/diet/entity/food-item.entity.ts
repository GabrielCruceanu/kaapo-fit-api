import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from './meal.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class FoodItem extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @ManyToOne(() => Meal, (meal) => meal.foodItems)
  meal: Meal;
}
