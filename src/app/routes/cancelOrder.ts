import { OrderDetails } from '@prisma/client';
import { TResponse } from '../utils/type';
import { orderIdValidators } from '../utils/validators';
import { prismaClientAssign } from '../prismaPlugin/prismaPlugin';

export async function cancelOrder(data: {
  orderId: string;
}): Promise<TResponse<OrderDetails>> {
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

    const cancleOrder = await ps.$transaction([
      ps.tax.deleteMany({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.item.deleteMany({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.orderDetails.delete({
        where: {
          orderId: data.orderId,
        },
      }),
    ]);

    return {
      status: 'SUCCESS',
      message: ' Order has been cancelled successfully',
      data: null,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error,
      message: error.message,
    };
  }
}
