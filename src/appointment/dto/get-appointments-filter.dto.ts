import { IsEnum, IsNotEmpty } from 'class-validator';
import { AppointmentStatus } from '../entity/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetAppointmentsFilterDto {
  @ApiProperty({ example: AppointmentStatus })
  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
