import Fastify from 'fastify';
import { IOrderInterface } from './routes/interface';
import { generateID } from '@jetit/id';
import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';
import { table } from 'console';
import { it } from 'node:test';

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
      .send(route.createOrder.callBack(request.body as IOrderInterface))
      .send({ status: 'success', message: 'data created successfully' });
  },
});

// create order
async function createOrder(data: IOrderInterface) {
  const ps = prismaClientAssign();
  const oId = generateID('HEX', '01');
  const arr = [];

  try {
    arr.push(
      ps.orderDetails.create({
        data: {
          orderId: oId,
          status: data.status,
        },
      })
    );
    data.item.forEach((item) => {
      const itemId = generateID('HEX', '02');
      arr.push(
        ps.item.create({
          data: {
            orderId: oId,
            itemId: itemId,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            amount: item.amount,
          },
        })
      );

      item.tax.forEach((tax) => {
        arr.push(
          ps.tax.create({
            data: {
              taxId: generateID('HEX', '03'),
              orderId: oId,
              itemId: itemId,
              taxType: tax.taxType,
              taxAmount: tax.taxAmount,
            },
          })
        );
      });
    });

    const transaction = await ps.$transaction(arr);

    console.log('Order created successfully');
    return { success: true, data: transaction };
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}

//  get order

const route1 = {
  getOrder: {
    url: '/get/order',
    callBack: getOrder,
  },
};

fastify.post('/get/order', async (request, response) => {
  try {
    const result = await getOrder(request.body as IOrderInterface);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ error: 'Failed to fetch order' });
  }
});

async function getOrder(data: IOrderInterface) {
  const ps = prismaClientAssign();
  try {
    const orderDetails = await ps.$transaction([
      ps.orderDetails.findFirst({
        where: { orderId: data.orderId },
      }),
      ps.item.findMany({
        where: { orderId: data.orderId },
      }),
    ]);

    if (!orderDetails) {
      throw new Error('Order not found');
    }

    const itemsWithTaxes = await Promise.all(
      orderDetails[1].map(async (item) => {
        const taxes = await ps.tax.findMany({
          where: { itemId: item.itemId },
        });
        return { ...item, taxes };
      })
    );
    console.log(itemsWithTaxes);
    return {
      ...orderDetails,
      items: itemsWithTaxes,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch order');
  }
}

export const fastifyServer = fastify;
