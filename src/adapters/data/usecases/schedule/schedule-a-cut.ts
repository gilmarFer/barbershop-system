import { ScheduleACut } from '../../../../domain/usecases/schedule/schedule-a-cut';
import { ScheduleACutRepository } from '../../protocols/schedule/schedule-a-cut-repository';

export class ScheduleACutAbstract implements ScheduleACut {
  constructor(
    private readonly scheduleACutRepository: ScheduleACutRepository,
  ) {}

  async add(userData: ScheduleACut.Params): Promise<ScheduleACut.Result> {
    const getAvaliableDates =
      await this.scheduleACutRepository.getAdmFreeDates();

    const barbers = getAvaliableDates.barbers;
    if (userData.barber > barbers.length - 1)
      return { isValid: false, errorName: 'Barber not found' };

    const isDayAvaliable = getAvaliableDates.days.includes(
      userData.date.getDay(),
    );
    if (!isDayAvaliable)
      return { isValid: false, errorName: 'Day of week is unavailable' };

    let isHourAvaliable = false;
    const userHour = userData.date.getHours();
    const userMinute = userData.date.getMinutes();
    for (const db of getAvaliableDates.hours) {
      const dbData = new Date(db);
      const dbHour = dbData.getHours();
      const dbMinute = dbData.getMinutes();
      if (userHour === dbHour && userMinute === dbMinute) {
        isHourAvaliable = true;
      }
    }
    if (!isHourAvaliable)
      return { isValid: false, errorName: 'Hour is unavailable' };

    const isFreeHour = await this.scheduleACutRepository.isHourAndBarberFree(
      userData.date,
      userData.barber,
    );
    if (!isFreeHour.isValid)
      return { isValid: false, errorName: 'Hours is not free' };

    const barber = getAvaliableDates.barbers[userData.barber];
    const schedule = await this.scheduleACutRepository.addNewschedule(userData);
    schedule.body.barber = barber;
    return { isValid: true, body: schedule.body };
  }
}
