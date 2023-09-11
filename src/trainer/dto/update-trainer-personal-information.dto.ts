import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { GenderType } from '../../users/types/gender.enum';

export class UpdateTrainerPersonalInformationDto {
  @ApiProperty({ example: 'Chad Gary' }) @IsString() name: string;

  @ApiProperty({ example: GenderType }) @IsEnum(GenderType) gender: GenderType;

  @ApiProperty({ example: '13-4-1993' }) @IsString() dateOfBirth: string;

  @ApiProperty({
    example: [
      'Chad Gary Cockle is a 27-year-old IT technician who enjoys binge-watching boxed sets, listening to the radio and vandalising bus stops. He is gentle and stable, but can also be very evil and a bit lazy.',
    ],
  })
  @IsString()
  @MaxLength(340)
  biography?: string;

  @ApiProperty({
    example: ['Change your mindset.'],
  })
  @IsString()
  @MaxLength(340)
  fitnessPhilosophy?: string;
}
