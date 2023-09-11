import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Repository } from 'typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { GetAppointmentsFilterDto } from './dto/get-appointments-filter.dto';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    this.logger.debug(`Creating a new appointment: ${createAppointmentDto}`);

    return this.appointmentRepository.save(
      this.appointmentRepository.create(createAppointmentDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Appointment[]> {
    this.logger.debug(
      `Finding all appointments with pagination: ${paginationOptions}`,
    );

    return this.appointmentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findManyByStatus(
    getAppointmentsFilterDto: GetAppointmentsFilterDto,
  ): Promise<Appointment[]> {
    this.logger.debug(
      `Finding all appointments by status: ${getAppointmentsFilterDto}`,
    );

    return this.appointmentRepository.findBy({
      status: getAppointmentsFilterDto.status,
    });
  }
}
