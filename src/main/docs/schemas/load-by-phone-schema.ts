export const loadByPhoneParamsSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
    },
  },
  require: ['phone'],
};

export const loadByPhoneSchema = {
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
