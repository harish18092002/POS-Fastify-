import Fastify from 'fastify';
import { IOrderInterface } from './routes/interface';
import { generateID } from '@jetit/id';
import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';
import { TResponse } from './routes/type';
import { OrderDetails } from '@prisma/client';
import { itemValidator, orderIdValidators } from './routes/validators';

export const fastify = Fastify();
fastify.register(prismaPlugin);

const route: Record<string, Record<string, any>> = {
  createOrder: {
    url: '/create/order',
    callBack: createOrder,
  },
  getOrder: {
    url: '/get/order',
    callBack: getOrder,
  },
  cancelOrder: {
    url: '/cancel/order',
    callBack: cancelOrder,
  },
};

Object.values(route).forEach(function (values) {
  fastify.post(values.url, async (request, response) => {
    try {
      const res = await values.callBack(request.body);
      response.status(200).send(res);
    } catch (error) {
      response.status(500).send(error.message);
    }
  });
});

async function createOrder(
  data: IOrderInterface
): Promise<{ status: string; data: any; message: string }> {
  const ps = prismaClientAssign();
  const oId = generateID('HEX', '01');
  const arr = [];

  try {
    itemValidator(data);
    const itemId = generateID('HEX', '02');
    const totalSum = data.item.reduce((acc, item) => {
      const itemTotal = parseInt(item.amount) * parseInt(item.quantity);
      const totalTax = item.tax.reduce(
        (taxAcc, tax) => taxAcc + parseInt(tax.taxAmount),
        0
      );
      return acc + itemTotal + totalTax;
    }, 0);

    arr.push(
      ps.orderDetails.create({
        data: {
          totalAmount: JSON.stringify(totalSum),
          orderId: oId,
          status: 'ACCEPTED',
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

    return {
      status: 'SUCCESS',
      data: { orderId: oId },
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

async function getOrder(data: IOrderInterface) {
  const ps = prismaClientAssign();
  try {
    orderIdValidators(data.orderId);
    const orderDetails = await ps.$transaction([
      ps.orderDetails.findFirst({
        where: { orderId: data.orderId },
      }),
      ps.item.findMany({
        where: { orderId: data.orderId },
        select: {
          itemId: true,
          name: true,
          description: true,
          quantity: true,
          amount: true,
          tax: true,
        },
      }),
      // ps.tax.findMany({
      //   where: {
      //     orderId: data.orderId,
      //   },
      //   select: {
      //     itemId: true,
      //     taxId: true,
      //     taxAmount: true,
      //     taxType: true,
      //   },
      // }),
    ]);
    if (!orderDetails) {
      throw new Error('Order not found');
    }
    // const itemsWithTaxes = [];
    // orderDetails[1].forEach((item) => {
    //   orderDetails[2].find((tax) => {
    //     if (item.itemId == tax.itemId) {
    //       itemsWithTaxes.push(item, tax);
    //     }
    //   });
    // });

    // console.log(itemsWithTaxes);
    return {
      orderDetails,
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
async function cancelOrder(data: {
  orderId: string;
}): Promise<TResponse<OrderDetails>> {
  console.log(data);
  try {
    orderIdValidators(data.orderId);
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
      message: error.message,
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

//     const updateTable = await ps.$transaction({});
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
