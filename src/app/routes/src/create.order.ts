import { generateID } from '@jetit/id';
import { prismaClientAssign } from '../../prismaPlugin/prismaPlugin';
import { IOrderInterface, TResponse, itemValidator } from '../../utils';

import { OrderDetails } from '@prisma/client';

export async function createOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
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
