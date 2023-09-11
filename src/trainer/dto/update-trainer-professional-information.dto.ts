import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TrainerSpecialization } from '../types/trainer-specialization.enum';

export class UpdateTrainerProfessionalInformationDto {
  @ApiProperty({ example: TrainerSpecialization })
  @IsEnum(TrainerSpecialization)
  specialization: TrainerSpecialization;

  @ApiProperty({ example: 5 }) @IsNotEmpty() yearsOfExperience: number;

  @ApiProperty({
    example: [
      'Personal Trainer Certification',
      'Group Fitness Instructor Certification',
    ],
  })
  @IsString({ each: true })
  certifications?: string[];

  @ApiProperty({ example: ['Get Stronger', 'Burn Fat'] })
  @IsNotEmpty()
  @IsString({ each: true })
  achievements?: string[];

  @ApiProperty({ example: 'Sport College' }) @IsString() education?: string;

  @ApiProperty({ example: ['English', 'German'] })
  @IsNotEmpty()
  @IsString({ each: true })
  languagesSpoken?: string[];
}
