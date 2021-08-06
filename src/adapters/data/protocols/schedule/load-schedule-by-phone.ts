import { LoadScheduleByPhone } from '../../../../domain/usecases/schedule/load-schedules-by-phone';

export interface LoadScheduleByPhoneRepository {
  loadByPhone(phone: string): Promise<LoadScheduleByPhone.Result>;
}
