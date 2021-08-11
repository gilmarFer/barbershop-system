import { LoadAdmConfigsRepository } from '../../../adapters/data/protocols/admin/load-adm-config';
import { SaveAdmConfigsRepository } from '../../../adapters/data/protocols/admin/save-adm-config';
import { LoadAdmConfigs } from '../../../domain/usecases/admin/load-adm-configs';
import { SaveAdmConfigs } from '../../../domain/usecases/admin/save-adm-configs';
import { MongoHelper } from './helpers/mongo-helper';

export class MongoAdmRepository
  implements SaveAdmConfigsRepository, LoadAdmConfigsRepository
{
  async saveAdmConfig(
    params: SaveAdmConfigs.Params,
  ): Promise<SaveAdmConfigs.Result> {
    const admCollection = MongoHelper.getCollection(
      process.env.ADM_COLLECTION || 'adm',
    );
    params.key = '1';
    const isAnotherAdmConfigSaved = await (
      await admCollection
    ).findOne({ key: '1' });
    if (!isAnotherAdmConfigSaved) {
      const admConfig = await (await admCollection).insertOne(params);
      const admFiXId = MongoHelper.fixIdUnity(admConfig.ops[0]);
      return { isValid: true, body: admFiXId };
    } else {
      (await admCollection).findOneAndUpdate(
        { key: '1' },
        { $set: params },
        { upsert: true },
      );
      const admConfig = await (await admCollection).findOne({ key: '1' });
      const admFiXId = MongoHelper.fixIdUnity(admConfig);
      return { isValid: true, body: admFiXId };
    }
  }

  async loadAdmConfig(): Promise<LoadAdmConfigs.Result> {
    const admCollection = MongoHelper.getCollection(
      process.env.ADM_COLLECTION || 'adm',
    );
    const admConfigs = await (await admCollection).find().toArray();
    const admWithFixId = MongoHelper.fixIdList(admConfigs);
    return { isValid: true, body: admWithFixId[0] };
  }
}
