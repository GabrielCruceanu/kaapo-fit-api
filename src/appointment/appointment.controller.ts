import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Appointment } from './entity/appointment.entity';
import { AppointmentService } from './appointment.service';
import { GetAppointmentsFilterDto } from './dto/get-appointments-filter.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../utils/infinity-pagination';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Appointments')
@Controller({
  path: 'appointments',
  version: '1',
})
export class AppointmentController {
  private logger = new Logger('AppointmentController', { timestamp: true });

  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Appointment>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.appointmentService.findManyWithPagination({ page, limit }),
      { page, limit },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/status')
  @HttpCode(HttpStatus.OK)
  async findAllByStatus(
    @Query() getAppointmentsFilterDto: GetAppointmentsFilterDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Appointment>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.appointmentService.findManyByStatus(getAppointmentsFilterDto),
      {
        page,
        limit,
      },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    this.logger.verbose(
      `User "${4}" creating a new appointment. Data ${JSON.stringify(
        createAppointmentDto,
      )}`,
    );

    return this.appointmentService.create(createAppointmentDto);
  }
}
