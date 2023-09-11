import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { TrainingSession } from './entities/training-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer, TrainingSession])],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
