import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Client } from './entities/client.entity';
import { Nutritionist } from './entities/nutritionist.entity';
import { Trainer } from './entities/trainer.entity';
import { TrainingSession } from './entities/training-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Client,
      Trainer,
      TrainingSession,
      Nutritionist,
    ]),
  ],
  controllers: [UsersController],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
