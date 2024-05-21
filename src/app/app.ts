import Fastify from 'fastify';
import { IOrderInterface } from './routes/interface';
import { generateID } from '@jetit/id';
import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';

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

async function createOrder(data: IOrderInterface) {
  const ps = prismaClientAssign();
  const oId = generateID('HEX');

  try {
    await ps.$transaction(async (prisma) => {
      console.log('Creating order with ID:', oId);
      await prisma.orderDetails.create({
        data: {
          orderId: oId,
          status: data.status,
        },
      });

      const itemPromises = data.item.map(async (item) => {
        const itemId = generateID('HEX');
        console.log('Creating item with ID:', itemId);
        await prisma.item.create({
          data: {
            orderId: oId,
            itemId: itemId,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            amount: item.amount,
          },
        });

        const taxPromises = item.tax.map(async (tax) => {
          const taxId = generateID('HEX');
          console.log('Creating tax with ID:', taxId);
          await prisma.tax.create({
            data: {
              taxId: taxId,
              itemId: itemId,
              taxType: tax.taxType,
              taxAmount: tax.taxAmount,
            },
          });
        });
        await Promise.all(taxPromises);
      });
      await Promise.all(itemPromises);
    });

    console.log('Order created successfully');
    return { success: true, orderId: oId };
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}

export const fastifyServer = fastify;
