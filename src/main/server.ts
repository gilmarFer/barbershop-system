import { config } from 'dotenv';
config();

import { MongoHelper } from '../external/repository/mongodb/helpers/mongo-helper';

MongoHelper.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/barber')
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(process.env.PORT || 5050, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(console.error);
