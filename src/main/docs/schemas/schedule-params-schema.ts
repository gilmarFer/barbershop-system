export const scheduleParamsSchema = {
  type: 'object',
  properties: {
    nome: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    data: {
      type: 'string',
    },
    barber: {
      type: 'number',
    },
  },
  require: ['nome', 'phone', 'data', 'barber'],
};

export const scheduleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    nome: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    data: {
      type: 'string',
    },
    barber: {
      type: 'string',
    },
  },
};
