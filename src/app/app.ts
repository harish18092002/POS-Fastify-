import * as path from 'path';
import Fastify from 'fastify';
import { ICreateOrder } from './routes/interface';
import { generateID } from '@jetit/id';
import prismaPlugin from 'src/assets/prisma/prisma';
export const fastify = Fastify();

fastify.register(prismaPlugin);

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
    console.log(request.body);
    response
      .status(200)
      .send(route.createOrder.callBack(request.body as ICreateOrder));
  },
});

function createOrder(data: ICreateOrder) {
  const createOrder = async () => {
    const create = await {
      data: {
        id: generateID('HEX'),
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        tax: data.tax,
        amount: data.amount,
      },
    };
    return createOrder;
  };
}
