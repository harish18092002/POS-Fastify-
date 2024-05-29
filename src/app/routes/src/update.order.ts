import { OrderDetails } from '@prisma/client';
import { prismaClientAssign } from '../../prismaPlugin';
import { IOrderInterface, TResponse } from '../../utils';
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

    console.log(existingOrder);
    if (!existingOrder) {
      return {
        status: 'ERROR',
        data: null,
        message: 'Order does not exist. Please create a new order.',
      };
    }
    const amountAndTax = [];
    // updating the total amount occurs here
    data.item.map((datas) => {
      if (!datas.hasOwnProperty('itemId')) {
        if (datas.hasOwnProperty('amount') && datas.hasOwnProperty('tax')) {
          amountAndTax.push(datas);
        } else {
          console.log('amount and tax does not present');
        }
      }
    });

    const totalSum = amountAndTax.reduce((acc, item) => {
      const itemTotal = parseFloat(item.amount) * parseFloat(item.quantity);
      const totalTax = item.tax.reduce(
        (taxAcc, tax) => taxAcc + parseFloat(tax.taxAmount),
        0
      );
      return acc + itemTotal + totalTax;
    }, 0);

    const existingOrderAmountUpdate =
      parseFloat(existingOrder.totalAmount) + totalSum;

    // updating total amount in db

    await ps.orderDetails.update({
      where: {
        orderId: data.orderId,
      },
      data: {
        totalAmount: JSON.stringify(existingOrderAmountUpdate),
      },
    });

    const itemId = data.item.map((item) => {
      return item.itemId;
    });
    const filteredId = itemId.filter((x) => x !== undefined);

    const existingItem = await ps.item.findMany({
      where: {
        itemId: { in: filteredId },
      },
    });

    data.item.forEach(async (item) => {
      const itemId = item.itemId || generateID('HEX', '02');

      if (
        item.hasOwnProperty('itemId') &&
        existingItem[0].itemId === item.itemId
      ) {
        arr.push(
          ps.item.update({
            where: { itemId: itemId },
            data: {
              quantity: item.quantity,
              amount: item.amount,
              name: item.name,
              description: item.description,
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
      }
    });

    await ps.$transaction(arr);
    //  for getting all the details from db after updating
    const orderDetails = await ps.orderDetails.findFirst({
      where: { orderId: data.orderId },
      select: {
        orderId: true,
        status: true,
        totalAmount: true,
        item: {
          select: {
            itemId: true,
            name: true,
            description: true,
            quantity: true,
            amount: true,
            tax: {
              select: {
                taxAmount: true,
                taxId: true,
                taxType: true,
              },
            },
          },
        },
      },
    });

    console.log('Order updated successfully');
    return {
      status: 'SUCCESS',
      data: orderDetails,
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
