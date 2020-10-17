import { startOfHour } from 'date-fns'
import {getCustomRepository} from 'typeorm'

import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

/**
 * [X] Recebimento das informaçoes
 * [X] Tratativa de erros/excessões
 * [X] Acesso ao repositorio
 */

interface RequestDTO {
  provider: string,
  date: Date
}

export class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) throw Error("This appointment is alread booked");

    const appointment = appointmentsRepository.create({ provider, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment
  }
}
