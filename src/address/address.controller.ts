import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Address | null> {
    return this.addressService.findOne(+id);
  }

  @Post()
  create(@Body() address: Address): Promise<Address> {
    return this.addressService.create(address);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() address: Address): Promise<Address> {
    return this.addressService.update(+id, address);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.addressService.remove(+id);
  }
}
