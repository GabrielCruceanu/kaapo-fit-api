import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { GenderType } from '../../users/types/gender.enum';
import { TrainerSpecialization } from '../types/trainer-specialization.enum';
import { UserBirth } from '../../users/types/user-birth.interface';

export class CreateTrainerDto {
  @ApiProperty({ example: 'Chad Gary' })
  @IsString()
  name: string;

  @ApiProperty({ example: GenderType.MALE })
  @IsEnum(GenderType)
  gender: GenderType;

  @ApiProperty({ example: '13-4-1993' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: TrainerSpecialization.CALISTHENICS })
  @IsEnum(TrainerSpecialization)
  specialization: TrainerSpecialization;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  yearsOfExperience: number;
}
