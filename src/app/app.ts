import Fastify from 'fastify';
import { IOrderInterface } from './routes/interface';
import { generateID } from '@jetit/id';
import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';
import { PrismaClient } from '@prisma/client';

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
      .send(route.createOrder.callBack(request.body as IOrderInterface));
  },
});

function createOrder(data: IOrderInterface) {
  const ps = prismaClientAssign();
  try {
    const createOrder = async () => {
      const create = await ps.orderDetails.create({
        data: {
          orderId: generateID('HEX'),
          status: data.status,
        },
      });
      return createOrder;
    };
  } catch (error) {
    return error;
  }
}
