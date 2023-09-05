import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: '1' })
  @IsOptional()
  trainer_id: string | null;

  @ApiProperty({ example: '4' })
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({ example: '2023-08-19T07:32:33.621Z' })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: '13:27:00 GMT+030' })
  @IsNotEmpty()
  time: string;

  @ApiProperty({ example: 'Focsani' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: '5' })
  @IsOptional()
  nutritionist_id: string | null;
}
