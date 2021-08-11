import { SaveAdmConfigs } from '../../../../domain/usecases/admin/save-adm-configs';
import { AdmAuth } from '../../protocols/admin/is-adm-auth';
import { SaveAdmConfigsRepository } from '../../protocols/admin/save-adm-config';

export class SaveAdmConfigsAbstract implements SaveAdmConfigs {
  constructor(
    private readonly saveAdmConfigRepository: SaveAdmConfigsRepository,
    private readonly admAuth: AdmAuth,
  ) {}

  async save(params: SaveAdmConfigs.Params): Promise<SaveAdmConfigs.Result> {
    const isAdmAuth = this.admAuth.isAdmAuth(params.key);
    if (!isAdmAuth) return { isValid: false, errorName: 'ACCESS DENIED' };
    const admConfigs = await this.saveAdmConfigRepository.saveAdmConfig(params);
    return { isValid: true, body: admConfigs.body };
  }
}
