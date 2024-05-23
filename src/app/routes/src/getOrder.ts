import { prismaClientAssign } from '../../prismaPlugin/prismaPlugin';
import { IOrderInterface } from '../../utils/src/interface';
import { orderIdValidators } from '../../utils/src/validators';

export async function getOrder(data: IOrderInterface) {
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
      orderDetails,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Incorrect order Id ',
    };
  }
}
