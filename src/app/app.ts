import Fastify from 'fastify';
import { IOrderInterface } from './routes/interface';
import { generateID } from '@jetit/id';
import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';
import { TResponse } from './routes/type';
import { OrderDetails } from '@prisma/client';
import { itemValidator } from './routes/validators';

export const fastify = Fastify();
fastify.register(prismaPlugin);
// create order
fastify.post('/create/order', async (request, response) => {
  try {
    const result = await createOrder(request.body as IOrderInterface);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      status: 'ERROR',
      data: null,
      error: 'Failed to create an order',
    });
  }
});
async function createOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
  const ps = prismaClientAssign();
  const oId = generateID('HEX', '01');
  const arr = [];

  try {
    itemValidator(data);

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
    return {
      status: 'SUCCESS',
      data: null,
      message: 'Order has been created successfully',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Error occured during creating the order',
    };
  }
}

// get order form db
fastify.post('/get/order', async (request, response) => {
  try {
    const result = await getOrder(request.body as IOrderInterface);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      status: 'ERROR',
      data: null,
      message: 'Failed to fetch order from database',
    });
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
          select: {
            taxId: true,
            taxAmount: true,
            taxType: true,
          },
        });
        return { ...item, taxes };
      })
    );
    console.log(itemsWithTaxes);
    return {
      items: itemsWithTaxes,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Incorrect order Id ',
    };
  }
}

//cancel order
const route2 = {};

fastify.post('/cancel/order', async (request, response) => {
  try {
    const result = await cancelOrder(request.body as { orderId: string });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      status: 'ERROR',
      data: null,
      message: 'Failed to cancel order',
    });
  }
});
async function cancelOrder(data: {
  orderId: string;
}): Promise<TResponse<OrderDetails>> {
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
    return {
      status: 'SUCCESS',
      message: ' Order has been cancelled successfully',
      data: null,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error,
      message: 'Error occured during cancellation of order',
    };
  }
}

//Update order

// fastify.post('/update/order', async (request, response) => {
//   try {
//     console.log(request.body);
//     const result = await updateOrder(request.body as { orderId: string });
//     response.send(result);
//   } catch (error) {
//     response.status(500).send({
//       status: 'ERROR',
//       data: null,
//       message: 'Failed to update order',
//     });
//   }
// });

// async function updateOrder(data: {
//   orderId: string;
// }): Promise<TResponse<OrderDetails>> {
//   console.log(data);
//   try {
//     const ps = prismaClientAssign();
//     const orderData = await ps.orderDetails.findFirst({
//       where: {
//         orderId: data.orderId,
//       },
//     });
//     if (!orderData) {
//       return {
//         status: 'ERROR',
//         message: 'Order Id does not exists in the database',
//         data: null,
//       };
//     }

//     const updateTable = await ps.$transaction({

//     });
//   } catch (error) {
//     return {
//       status: 'ERROR',
//       data: null,
//       message: 'Error occured during updating the order',
//     };
//   }
// }

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
