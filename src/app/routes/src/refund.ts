import { payments } from '@prisma/client';
import { prismaClientAssign } from '../../prismaPlugin/index';
import { IPaymentsInterface, TResponse, orderIdValidators } from '../../utils';
import { generateID } from '@jetit/id';

export async function refund(
  data: IPaymentsInterface
): Promise<TResponse<payments>> {
  const ps = prismaClientAssign();
  try {
    orderIdValidators(data.orderId);

    const [paymentDetails, orderDetails] = await ps.$transaction([
      ps.payments.findMany({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.orderDetails.findFirst({
        where: {
          orderId: data.orderId,
        },
      }),
    ]);

    if (!orderDetails) {
      return {
        data: null,
        message: 'Incorrect Order ID',
        status: 'ERROR',
      };
    }

    const totalAmount = orderDetails.totalAmount;
    let isRefunded = false;
    let isCompleted = false;

    for (const payment of paymentDetails) {
      if (payment.paymentStatus === 'REFUNDED') {
        isRefunded = true;
      }
      if (payment.paymentStatus === 'COMPLETED') {
        isCompleted = true;
      }
    }

    if (isRefunded) {
      return {
        data: null,
        message: 'Payment has been refunded already',
        status: 'ERROR',
      };
    }

    if (!isCompleted) {
      return {
        data: null,
        message: 'No completed payment found to refund',
        status: 'ERROR',
      };
    }

    const paymentId = generateID('HEX', '04');
    const refundPayment = await ps.payments.create({
      data: {
        paymentId: paymentId,
        orderId: data.orderId,
        paymentStatus: 'REFUNDED',
      },
    });

    return {
      data: refundPayment,
      message: `The total amount to be refunded is ${totalAmount}`,
      status: 'SUCCESS',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Error occurred during processing the refund',
    };
  }
}
