import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserSeedService } from './user-seed.service';
import { Client } from '../../../users/entities/client.entity';
import { Trainer } from '../../../trainer/entities/trainer.entity';
import { Nutritionist } from '../../../users/entities/nutritionist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Trainer, Nutritionist])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
