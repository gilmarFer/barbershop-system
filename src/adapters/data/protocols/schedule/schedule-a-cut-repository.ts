import { ScheduleACut } from '../../../../domain/usecases/schedule/schedule-a-cut';

export interface ScheduleACutRepository {
  addNewschedule(userData: ScheduleACut.Params): Promise<ScheduleACut.Result>;
  isHourAndBarberFree(date: Date, barber: number): Promise<ScheduleACut.Result>;
  getAdmFreeDates(): Promise<{
    days: number[];
    hours: Date[];
    barbers: string[];
  }>;
}
