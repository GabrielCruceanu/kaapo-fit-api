import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { NullableType } from '../utils/types/nullable.type';
import { EntityCondition } from '../utils/types/entity-condition.type';
@Injectable()
export class TrainerService {
  private readonly logger = new Logger(TrainerService.name);
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    this.logger.debug(`Creating a new trainer: ${createTrainerDto}`);

    const trainer = new Trainer();
    //   map dto to entity and then save
    Object.assign(trainer, createTrainerDto);
    return this.trainerRepository.save(trainer);
  }
  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Trainer[]> {
    this.logger.debug(
      `Finding all trainers with pagination: ${paginationOptions}`,
    );

    return this.trainerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Trainer>): Promise<NullableType<Trainer>> {
    this.logger.debug(`Finding a single trainer with fields: ${fields}`);

    return this.trainerRepository.findOne({ where: fields });
  }

  update(id: Trainer['id'], payload: DeepPartial<Trainer>): Promise<Trainer> {
    this.logger.debug(`Update trainer ${id} with payload: ${payload}`);

    return this.trainerRepository.save(
      this.trainerRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Trainer['id']): Promise<void> {
    this.logger.debug(`Delete trainer ${id}`);

    await this.trainerRepository.softDelete(id);
  }

  // async addAddressToTrainer(
  //   trainerId: number,
  //   address: Address,
  // ): Promise<Trainer> {
  //   // Create and save the Address
  //   await this.addressService.create(address);
  //
  //   // Find the Trainer and associate the address
  //   const trainer = await this.trainerRepository.findOne({
  //     where: {
  //       id: trainerId,
  //     },
  //   });
  //
  //   if (!trainer) {
  //     throw new Error('Trainer not found'); // Error handling
  //   }
  //
  //   return this.trainerRepository.save(trainer);
  // }
}
