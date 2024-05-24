import { OrderDetails } from '@prisma/client';
import { IOrderInterface, orderIdValidators, TResponse } from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin/plugins/prismaPlugin';

export async function cancelOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
  try {
    orderIdValidators(data.orderId);
    const ps = prismaClientAssign();
    const findOrder = await ps.orderDetails.findFirst({
      where: {
        orderId: data.orderId,
      },
    });

    if (!findOrder) throw new Error('order ID does not exist ');

    if (findOrder.status !== 'CANCELLED') {
      const updateOrder = await ps.orderDetails.update({
        where: {
          orderId: data.orderId,
        },
        data: {
          status: 'CANCELLED',
        },
      });
    } else {
      return {
        status: 'ERROR',
        message: 'Order has been cancelled already ',
        data: null,
      };
    }

    return {
      status: 'SUCCESS',
      message: ' Order has been cancelled successfully',
      data: data.orderId,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error,
      message: error.message,
    };
  }
}
