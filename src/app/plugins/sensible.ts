import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(sensible);
});

// import Fastify from 'fastify';
// import { IOrderInterface } from './routes/interface';
// import { prismaClientAssign, prismaPlugin } from './prismaPlugin/prismaPlugin';
// import { generateID } from '@jetit/id';

// export const fastify = Fastify();

// fastify.register(prismaPlugin);

// fastify.post('/update/order', async (request, response) => {
//   try {
//     const result = await updateOrder(request.body as IOrderInterface);
//     response.status(200).send(result);
//   } catch (error) {
//     response.status(500).send({
//       status: 'ERROR',
//       data: error.message,
//       message: 'Error occurred during updating the order',
//     });
//   }
// });

// async function updateOrder(data: IOrderInterface) {
//   const ps = prismaClientAssign();

//   try {
//     const orderId = data.orderId;
//     const existingOrder = await ps.orderDetails.findUnique({
//       where: { orderId },
//       include: { item: true },
//     });

//     if (!existingOrder) {
//       throw new Error('Order not found');
//     }

//     const updatePromises = data.item.map(async (item) => {
//       const existingItem = await ps.item.findUnique({
//         where: { itemId: item.itemId },
//       });

//       if (existingItem) {
//         // Update existing item
//         await ps.item.update({
//           where: { itemId: item.itemId },
//           data: {
//             name: item.name,
//             description: item.description,
//             quantity: item.quantity,
//             amount: item.amount,
//           },
//         });

//         // Update taxes for the item
//         await ps.tax.deleteMany({
//           where: { itemId: item.itemId },
//         });

//         const taxPromises = item.tax.map((tax) =>
//           ps.tax.create({
//             data: {
//               taxId: generateID('HEX', '03'),
//               orderId: orderId,
//               itemId: item.itemId,
//               taxType: tax.taxType,
//               taxAmount: tax.taxAmount,
//             },
//           })
//         );
//         await Promise.all(taxPromises);
//       } else {
//         // Create new item if not existing
//         const itemId = generateID('HEX', '02');
//         await ps.item.create({
//           data: {
//             orderId: orderId,
//             itemId: itemId,
//             name: item.name,
//             description: item.description,
//             quantity: item.quantity,
//             amount: item.amount,
//           },
//         });

//         const taxPromises = item.tax.map((tax) =>
//           ps.tax.create({
//             data: {
//               taxId: generateID('HEX', '03'),
//               orderId: orderId,
//               itemId: itemId,
//               taxType: tax.taxType,
//               taxAmount: tax.taxAmount,
//             },
//           })
//         );
//         await Promise.all(taxPromises);
//       }
//     });

//     await Promise.all(updatePromises);

//     return {
//       status: 'SUCCESS',
//       data: null,
//       message: 'Order has been updated successfully',
//     };
//   } catch (error) {
//     return {
//       status: 'ERROR',
//       data: error.message,
//       message: 'Error occurred during updating the order',
//     };
//   }
// }

// // Start the Fastify server
// const start = async () => {
//   try {
//     await fastify.listen({ port: 3000 });
//     console.log('Server is running at http://localhost:3000');
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();
