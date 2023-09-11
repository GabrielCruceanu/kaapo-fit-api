import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { TrainerModule } from '../trainer/trainer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
