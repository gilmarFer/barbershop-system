export const loadAdmConfigParamsSchema = {
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
  },
  require: ['key'],
};

export const loadAdmConfigSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    days: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    hours: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    barber: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
