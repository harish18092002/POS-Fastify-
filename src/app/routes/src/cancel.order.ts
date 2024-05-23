import { OrderDetails, orderStatus } from '@prisma/client';
import { IOrderInterface, orderIdValidators, TResponse } from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin/prismaPlugin';

export async function cancelOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
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
    const updateOrder = await ps.orderDetails.update({
      where: {
        orderId: data.orderId,
      },
      data: {
        status: 'CANCELLED',
      },
    });
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
