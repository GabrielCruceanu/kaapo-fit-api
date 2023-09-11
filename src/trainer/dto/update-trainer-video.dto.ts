import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrainerVideoDto {
  @ApiProperty({ example: 'https://www.youtube.com/watch?v=KwZGE6wSqEM' })
  @IsString()
  introVideoLink: string;
}
