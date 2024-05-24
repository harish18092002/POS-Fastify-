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

// for (const tax of item.tax) {
//   const existingTax = await ps.tax.findFirst({
//     where: { itemId: itemId, taxType: tax.taxType },
//   });

//   if (existingTax) {
//     arr.push(
//       ps.tax.update({
//         where: { taxId: existingTax.taxId },
//         data: { taxAmount: tax.taxAmount },
//       })
//     );
//   } else {
//     arr.push(
//       ps.tax.create({
//         data: {
//           taxId: generateID('HEX', '03'),
//           orderId: oId,
//           itemId: itemId,
//           taxType: tax.taxType,
//           taxAmount: tax.taxAmount,
//         },
//       })
//     );
//   }
// }
