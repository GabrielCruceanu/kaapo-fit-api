import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async create(address: Address): Promise<Address> {
    this.logger.debug(`Creating a new address: ${address}`);
    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    this.logger.debug(`Finding all addresses`);

    return this.addressRepository.find();
  }

  async findOne(id: number): Promise<Address | null> {
    this.logger.debug(`Finding a single address with id: ${id}`);

    const address = this.addressRepository.findOne({ where: { id: id } });

    if (!address) {
      throw new Error('Address not found');
    }
    return address;
  }

  async update(id: number, updatedAddress: Address): Promise<Address> {
    this.logger.debug(
      `Update address with id: ${id} and updated address: ${updatedAddress}`,
    );
    const address = await this.findOne(id);

    if (!address) {
      throw new Error('Address not found');
    }

    Object.assign(address, updatedAddress);

    return this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    this.logger.debug(`Delete address ${id}`);

    await this.addressRepository.delete(id);
  }
}
