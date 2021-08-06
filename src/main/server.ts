import { config } from 'dotenv';
config();

import { MongoHelper } from '../external/repository/mongodb/helpers/mongo-helper';

MongoHelper.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/sche')
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(process.env.PORT || 5050, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
      // const t = new MongoScheduleRepository();
      // t.loadByDate({
      //   initialDate: new Date('2021-08-01T09:30:00'),
      //   finalDate: new Date('2021-08-25T09:30:00'),
      // });
    });
  })
  .catch(console.error);
