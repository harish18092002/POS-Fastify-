import {
  IPaymentsInterface,
  TResponse,
  orderIdValidators,
  stringValidators,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin/index';
import { paymentStatus, payments } from '@prisma/client';
import { generateID } from '@jetit/id';

export async function initiatePayments(
  data: IPaymentsInterface
): Promise<TResponse<payments>> {
  const ps = prismaClientAssign();

  try {
    orderIdValidators(data.orderId);
    const details = await ps.$transaction([
      ps.orderDetails.findFirst({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.payments.findFirst({
        where: {
          orderId: data.orderId,
        },
      }),
    ]);

    if (!details[0]) {
      return {
        data: null,
        message: 'Order not found',
        status: 'ERROR',
      };
    } else {
      if (!details[1] || details[1].paymentStatus !== 'PENDING') {
        const paymentId = generateID('HEX', '04');
        const newPayment = await ps.payments.create({
          data: {
            orderId: details[0].orderId,
            paymentStatus: 'PENDING',
            paymentId: paymentId,
          },
        });

        return {
          data: { paymentId: newPayment.paymentId },
          message: 'Order payment has been initiated',
          status: 'SUCCESS',
        };
      } else {
        return {
          data: null,
          message: 'Order payment has been initiated already',
          status: 'ERROR',
        };
      }
    }
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message,
      data: 'Error occured during initiating the payment',
    };
  }
}
