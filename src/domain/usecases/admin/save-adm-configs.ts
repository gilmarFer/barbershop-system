import { AdmConfigModel } from '../../entites/adm-config';

export interface SaveAdmConfigs {
  save(params: SaveAdmConfigs.Params): Promise<SaveAdmConfigs.Result>;
}

export namespace SaveAdmConfigs {
  export type Params = {
    days: number[];
    hours: Date[];
    key: string;
    barbers: string[];
  };

  export type Result = {
    isValid: boolean;
    errorName?: string;
    body?: AdmConfigModel;
  };
}
