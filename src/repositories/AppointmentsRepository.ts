import { Appointment } from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    return await this.findOne({
      where: {date}
    }) || null;
  }
}
