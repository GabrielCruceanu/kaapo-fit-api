import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { TrainingSession } from './entities/training-session.entity';
import { AddressModule } from '../address/address.module';
import { AddressService } from '../address/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer, TrainingSession])],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
