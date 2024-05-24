import { OrderDetails } from '@prisma/client';

import { prismaClientAssign } from '../../prismaPlugin';
import { IOrderInterface, TResponse, orderIdValidators } from '../../utils';
import { generateID } from '@jetit/id';

export async function updateOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
  const ps = prismaClientAssign();
  const oId = data.orderId;
  const arr = [];

  try {
    const existingOrder = await ps.orderDetails.findFirst({
      where: { orderId: oId },
    });

    if (!existingOrder) {
      return {
        status: 'ERROR',
        data: null,
        message: 'Order does not exist. Please create a new order.',
      };
    }
    const itemData = data.item.forEach(async (item) => {
      const itemId = item.itemId || generateID('HEX', '02');

      const existingItem = await ps.item.findFirst({
        where: { itemId: itemId },
      });

      if (existingItem) {
        arr.push(
          ps.item.update({
            where: { itemId: itemId },
            data: {
              quantity: item.quantity,
              amount: item.amount,
            },
          })
        );
      } else {
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

        for (const tax of item.tax) {
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
        }
      }
    });

    await ps.$transaction(arr);

    console.log('Order updated successfully');
    return {
      status: 'SUCCESS',
      data: null,
      message: 'Order has been updated successfully',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Error occurred during updating the order',
    };
  }
}
