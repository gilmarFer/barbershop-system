export const loadByPhonePath = {
  post: {
    tags: ['To Schedule'],
    summary: 'Api para buscar agendamentos baseado em número de telefone',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loadByPhoneParamsSchema',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/loadByPhoneSchema',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
    },
  },
};
