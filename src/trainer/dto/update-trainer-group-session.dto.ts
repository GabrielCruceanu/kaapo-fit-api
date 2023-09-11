import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTrainerGroupSessionDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  offersGroupSessions: boolean;

  @ApiProperty({ example: 32 })
  groupSessionRate?: number;

  @ApiProperty({ example: true })
  offersTrialSession: boolean;
}
