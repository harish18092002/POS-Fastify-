import { OrderDetails } from '@prisma/client';
import { prismaClientAssign } from '../../prismaPlugin/plugins/prismaPlugin';
import { IOrderInterface, TResponse, orderIdValidators } from '../../utils';

export async function getOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
  const ps = prismaClientAssign();
  try {
    orderIdValidators(data.orderId);
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
    if (!orderDetails) {
      throw new Error('Order not found');
    }
    return {
      status: 'SUCCESS',
      data: orderDetails,
      message: 'Order has been fetched successflly ',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Incorrect order Id ',
    };
  }
}
