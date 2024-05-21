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

fastify.route({
  method: 'POST',
  url: route1.getOrder.url,
  handler: (request, response) => {
    console.log(request.body);
    response
      .status(200)
      .send(route1.getOrder.callBack(request.body as IOrderInterface));
  },
});
async function getOrder(data: IOrderInterface) {
  console.log(data);
  const ps = prismaClientAssign();
  try {
    const orderDetail = await ps.orderDetails.findFirst({
      where: {
        orderId: data.orderId,
      },
    });

    const itemData = await ps.item.findMany({
      where: {
        orderId: data.orderId,
      },
    });

    for (const tax of itemData) {
      const taxData = await ps.tax.findFirst({
        where: {
          itemId: tax.itemId,
        },
      });
      console.log(taxData);
    }

    console.log(orderDetail);
    console.log(itemData);

    if (!orderDetail) {
      return {
        status: 'ERROR',
        orderId: data.orderId,
        message: 'Order Id not found',
      };
    }
    return {
      status: 'SUCCESS',
      orderId: orderDetail,
      message: 'Order Id found',
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const fastifyServer = fastify;
