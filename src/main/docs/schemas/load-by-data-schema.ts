export const loadByDataParamsSchema = {
  type: 'object',
  properties: {
    initialData: {
      type: 'string',
    },
    finalData: {
      type: 'string',
    },
    key: {
      type: 'string',
    },
  },
  require: ['initialData', 'finalData', 'key'],
};

export const loadByDataSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
      date: {
        type: 'string',
      },
      barber: {
        type: 'number',
      },
    },
  },
};
