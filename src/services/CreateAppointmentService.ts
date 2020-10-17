import { Appointment } from '../models/Appointment';
import { startOfHour } from 'date-fns'
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

/**
 * [X] Recebimento das informaçoes
 * [/] Tratativa de erros/excessões
 * [X] Acesso ao repositorio
 */

interface RequestDTO {
  provider: string,
  date: Date
}


export class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository

  // Dependency Inversion (SOLI*D*)
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) throw Error("This appointment is alread booked");

    const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

    return appointment
  }
}
