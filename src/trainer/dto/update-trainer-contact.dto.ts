import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../../address/entities/address.entity';

export class UpdateTrainerContactDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+440770121948' })
  @IsString()
  phone: string;

  @ApiProperty({
    example: {
      id: '1',
      trainerId: '8',
      street: '1896 Sherwood Circle',
      city: 'Chicago',
      state: 'Illinois',
      postalCode: '1896',
      country: 'Statele Unite ale Americii',
    },
  })
  @IsNotEmpty()
  address?: Address;

  @ApiProperty({
    example: ['www.facebook.com', 'www.twitter.com', 'www.instagram.com'],
  })
  @IsString({ each: true })
  socialMediaLinks?: string[];
}
