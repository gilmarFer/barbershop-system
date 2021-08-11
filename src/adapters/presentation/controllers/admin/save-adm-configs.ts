import { SaveAdmConfigsAbstract } from '../../../data/usecases/admin/save-adm-configs';
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
} from '../../helpers/http';
import { Controller } from '../../protocols/controller';

export class SaveAdmConfigsController implements Controller {
  constructor(
    private readonly saveAdmConfigsAbstract: SaveAdmConfigsAbstract,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { days, hours, barbers, key } = httpRequest.body;
      if (!days || !hours || !barbers)
        return badRequest(new Error('Days, hours or barber are invalid'));
      const saveConfig = await this.saveAdmConfigsAbstract.save({
        days,
        hours,
        key,
        barbers,
      });
      if (!saveConfig.isValid)
        return badRequest(new Error(saveConfig.errorName));
      return ok(saveConfig.body);
    } catch (error) {
      return serverError(error.message);
    }
  }
}
