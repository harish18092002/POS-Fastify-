import Fastify from 'fastify';
import { IOrderInterface } from './routes/interface';
import { generateID } from '@jetit/id';
import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';

export const fastify = Fastify();

fastify.register(prismaPlugin);

fastify.post('/create/order', async (request, response) => {
  try {
    const result = await createOrder(request.body as IOrderInterface);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ error: 'Failed to create an order' });
  }
});
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

// get order form db
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
      items: itemsWithTaxes,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch order');
  }
}

//cancel order
const route2 = {};

fastify.post('/cancel/order', async (request, response) => {
  try {
    const result = await cancelOrder(request.body as { orderId: string });
    response
      .status(200)
      .send({ message: 'Order has been cancelled successfully' });
  } catch (error) {
    response
      .status(500)
      .send({ error: 'Error occured during cancellation of order' });
  }
});
async function cancelOrder(data: { orderId: string }) {
  console.log(data);
  const ps = prismaClientAssign();
  const findOrder = await ps.orderDetails.findFirst({
    where: {
      orderId: data.orderId,
    },
  });

  if (!findOrder) {
    console.log('Order id not exist');
    throw new Error('order ID does not exist');
  }
  try {
    const cancleOrder = await ps.$transaction([
      ps.tax.deleteMany({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.item.deleteMany({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.orderDetails.delete({
        where: {
          orderId: data.orderId,
        },
      }),
    ]);
  } catch (error) {}
}
export const fastifyServer = fastify;

// this is the code to write endpoints using routes
// const route = {
//   createOrder: {
//     url: '/create/order',
//     callBack: createOrder,
//   },
//   getOrder: {
//     url: '/get/order',
//     callBack: getOrder,
//   },
//   cancelOrder: {
//     url: '/cancel/order',
//     callBack: cancelOrder,
//   },
// };
// fastify.p({
//   method: 'POST',
//   url: route.cancelOrder.url,
//   handler: (request, response) => {
//     try {
//       console.log(request.body);
//       response.send(
//         route.cancelOrder.callBack(request.body as { orderId: string })
//       ),
//         response.status(200).send({ error: 'Order cancelled successfully' });
//     } catch (error) {
//       response
//         .status(500)
//         .send({ message: 'Error occured during the cancellation of order' });
//     }
//   },
// });
// create order
