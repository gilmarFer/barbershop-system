export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'Api para autenticar um Admin',
    requestBody: {
      // description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParamsSchema',
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
              $ref: '#/schemas/accountSchema',
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
