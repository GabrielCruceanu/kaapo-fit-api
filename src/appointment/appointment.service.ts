import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Repository } from 'typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { GetAppointmentsFilterDto } from './dto/get-appointments-filter.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    console.log('createAppointmentDto', createAppointmentDto);
    return this.appointmentRepository.save(
      this.appointmentRepository.create(createAppointmentDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findManyByStatus(
    getAppointmentsFilterDto: GetAppointmentsFilterDto,
  ): Promise<Appointment[]> {
    return this.appointmentRepository.findBy({
      status: getAppointmentsFilterDto.status,
    });
  }
}
