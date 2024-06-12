import Fastify from 'fastify';
import { prismaPlugin } from './prismaPlugin/index';
import {
  createOrder,
  getOrder,
  cancelOrder,
  updateOrder,
  payments,
  refund,
  initiatePayments,
  checkPaymentStatus,
  getOrderPayments,
} from './routes';

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
  uppdateOrder: {
    url: '/update/order',
    callBack: updateOrder,
  },
  inititatePayments: {
    url: '/initiate',
    callBack: initiatePayments,
  },
  payments: {
    url: '/payments',
    callBack: payments,
  },
  refund: {
    url: '/refund',
    callBack: refund,
  },
  checkPaymentStatus: {
    url: '/payment/status',
    callBack: checkPaymentStatus,
  },
  getOrderPayments: {
    url: '/get/order/payments',
    callBack: getOrderPayments,
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
