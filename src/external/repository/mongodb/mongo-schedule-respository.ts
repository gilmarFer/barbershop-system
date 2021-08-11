import { LoadScheduleByDateRepository } from '../../../adapters/data/protocols/admin/load-schedule-by-date';
import { LoadScheduleByPhoneRepository } from '../../../adapters/data/protocols/schedule/load-schedule-by-phone';
import { ScheduleACutRepository } from '../../../adapters/data/protocols/schedule/schedule-a-cut-repository';
import { LoadScheduleByDate } from '../../../domain/usecases/admin/load-schedules-by-date';
import { LoadScheduleByPhone } from '../../../domain/usecases/schedule/load-schedules-by-phone';
import { ScheduleACut } from '../../../domain/usecases/schedule//schedule-a-cut';
import { MongoHelper } from './helpers/mongo-helper';

export class MongoScheduleRepository
  implements
    ScheduleACutRepository,
    LoadScheduleByPhoneRepository,
    LoadScheduleByDateRepository
{
  async addNewschedule(
    userData: ScheduleACut.Params,
  ): Promise<ScheduleACut.Result> {
    const userCollection = await MongoHelper.getCollection(
      process.env.SCHEDULE_COLLECTION || 'schedule',
    );
    const schedule = await userCollection.insertOne(userData);
    if (schedule.result.n < 1) {
      return { isValid: false };
    }
    const fixId = MongoHelper.fixIdUnity(schedule.ops[0]);
    return { isValid: true, body: fixId };
  }

  async isHourAndBarberFree(
    date: Date,
    barber: number,
  ): Promise<ScheduleACut.Result> {
    const userCollection = await MongoHelper.getCollection(
      process.env.SCHEDULE_COLLECTION || 'schedule',
    );
    const schedule = await userCollection.findOne({ date, barber });
    if (schedule) {
      return { isValid: false };
    }
    return { isValid: true };
  }

  async loadByPhone(phone: string): Promise<LoadScheduleByPhone.Result> {
    const userCollection = await MongoHelper.getCollection(
      process.env.SCHEDULE_COLLECTION || 'schedule',
    );
    const scheduleList = await userCollection.find({ phone }).toArray();
    return {
      isValid: true,
      body: MongoHelper.fixIdList(scheduleList),
    };
  }

  async loadByDate(
    params: LoadScheduleByDate.Params,
  ): Promise<LoadScheduleByDate.Result> {
    const userCollection = await MongoHelper.getCollection(
      process.env.SCHEDULE_COLLECTION || 'schedule',
    );
    const finalDate = new Date(params.finalDate);
    finalDate.setDate(finalDate.getDate() + 1);
    const scheludesList = await userCollection
      .find({
        date: {
          $gte: new Date(params.initialDate),
          $lt: new Date(finalDate),
        },
      })
      .toArray();
    const listWithFixId = MongoHelper.fixIdList(scheludesList);
    return { isValid: true, body: listWithFixId };
  }

  async getAdmFreeDates(): Promise<{
    days: number[];
    hours: Date[];
    barbers: string[];
  }> {
    const admCollection = await MongoHelper.getCollection(
      process.env.ADM_COLLECTION || 'adm',
    );
    const admConfigs = await admCollection.findOne({ key: '1' });
    const admConfigsWithFixId = MongoHelper.fixIdUnity(admConfigs);
    return admConfigsWithFixId;
  }
}
