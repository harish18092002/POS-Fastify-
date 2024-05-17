import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  const createOrderSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['name'] as const,
  };

  // fastify.post('/createOrder', (request, response) => {
  //   const data(IDatai) = request.body;
  //   return data;
  // });
}
