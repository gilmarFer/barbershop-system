import {
  schedulePath,
  loginPath,
  registerNewAdmPath,
  loadByPhonePath,
  loadByDataPath,
  saveAdmConfigPath,
  loadAdmConfigPath,
} from './paths';
import {
  registerNewAdmParamsSchema,
  registerNewAdmSchema,
  scheduleParamsSchema,
  scheduleSchema,
  loadByPhoneParamsSchema,
  loadByPhoneSchema,
  loadByDataParamsSchema,
  loadByDataSchema,
  errorSchema,
  accountSchema,
  loginParamsSchema,
  saveAdmConfigParamsSchema,
  saveAdmConfigSchema,
  loadAdmConfigParamsSchema,
  loadAdmConfigSchema,
} from './schemas';
import { badRequest } from './components/bad-request';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Barbershop Schedule API',
    description: 'Api para agendamento de um barbeiro',
    version: '1.0.1',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
    {
      name: 'To Schedule',
    },
    {
      name: 'Admin',
    },
  ],
  paths: {
    '/login': loginPath,
    '/register': registerNewAdmPath,
    '/schedule-a-cut': schedulePath,
    '/load-by-phone': loadByPhonePath,
    '/load-by-data': loadByDataPath,
    '/save-adm-config': saveAdmConfigPath,
    '/load-adm-config': loadAdmConfigPath,
  },
  schemas: {
    // Login
    loginParamsSchema,
    accountSchema,

    //Register a new ADM
    registerNewAdmParamsSchema,
    registerNewAdmSchema,

    //To Schedule
    scheduleParamsSchema,
    scheduleSchema,

    //Load by phone
    loadByPhoneParamsSchema,
    loadByPhoneSchema,

    //Load by data
    loadByDataParamsSchema,
    loadByDataSchema,

    //Save adm config
    saveAdmConfigParamsSchema,
    saveAdmConfigSchema,

    //Save adm config
    loadAdmConfigParamsSchema,
    loadAdmConfigSchema,

    //other
    errorSchema,
  },
  components: {
    badRequest,
  },
};
