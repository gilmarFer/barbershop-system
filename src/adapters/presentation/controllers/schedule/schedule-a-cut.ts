import { ScheduleACut } from '../../../../domain/usecases/schedule/schedule-a-cut';
import {
  HttpRequest,
  HttpResponse,
  serverError,
  badRequest,
  ok,
} from '../../helpers/http';
import { Controller } from '../../protocols/controller';

export class ScheduleACutController implements Controller {
  constructor(private readonly scheduleACut: ScheduleACut) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, phone, date, barber } = httpRequest.body;
      if (!name || !phone || !date || barber < 0 || barber == null) {
        return badRequest(new Error('Name, phone, data or barber is invalid'));
      }
      const dateToDate = new Date(date);
      if (dateToDate < new Date()) {
        return badRequest(new Error('You date is in the past'));
      }
      const schedule = await this.scheduleACut.add({
        name,
        phone,
        date: dateToDate,
        barber,
      });
      if (!schedule.isValid) {
        return badRequest(new Error(schedule.errorName));
      }
      return ok(schedule.body);
    } catch (error) {
      return serverError(error.message);
    }
  }
}
