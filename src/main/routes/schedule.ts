import { Router } from 'express';
import { adaptRoute } from '../adapter/express-router-adapters';
import { makeLoadScheduleByDateController } from '../factore/schedule/load-schedule-by-date';
import { makeLoadScheduleByPhoneController } from '../factore/schedule/load-schedule-by-phone';
import { makeScheduleACuteController } from '../factore/schedule/schedule-a-cute';

export default (router: Router): void => {
  router.post('/schedule-a-cut', adaptRoute(makeScheduleACuteController()));
  router.post(
    '/load-by-phone',
    adaptRoute(makeLoadScheduleByPhoneController()),
  );
  router.post('/load-by-date', adaptRoute(makeLoadScheduleByDateController()));
};
