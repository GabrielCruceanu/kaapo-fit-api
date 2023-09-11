import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GenderType } from '../../users/types/gender.enum';
import { TrainerSpecialization } from '../types/trainer-specialization.enum';

export class CreateTrainerDto {
  @ApiProperty({ example: 'Chad Gary' }) @IsString() name: string;

  @ApiProperty({ example: GenderType.MALE })
  @IsEnum(GenderType)
  gender: GenderType;

  @ApiProperty({ example: '13-4-1993' }) @IsString() dateOfBirth: string;

  @ApiProperty({ example: TrainerSpecialization.CALISTHENICS })
  @IsEnum(TrainerSpecialization)
  specialization: TrainerSpecialization;

  @ApiProperty({ example: 5 }) @IsNotEmpty() yearsOfExperience: number;
}
