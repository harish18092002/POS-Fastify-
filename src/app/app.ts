import Fastify from 'fastify';
import { prismaPlugin } from './prismaPlugin/prismaPlugin';
import { createOrder, getOrder, cancelOrder } from './routes';

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
