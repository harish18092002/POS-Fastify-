import * as path from 'path';

import Fastify from 'fastify';
import { ICreateOrder } from './routes/interface';
const fastify = Fastify({
  logger: true,
});
const route = {
  createOrder: {
    url: '/create/order',
    callBack: createOrder,
  },
};
fastify.route({
  method: 'POST',
  url: route.createOrder.url,
  handler: (request, response) => {
    route.createOrder.callBack(request.body as ICreateOrder);
  },
});

function createOrder(data: ICreateOrder) {}
