import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from './entity/diet.entity';
import { Meal } from './entity/meal.entity';
import { FoodItem } from './entity/food-item.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Diet, Meal, FoodItem]), AuthModule],
})
export class DietModule {}
