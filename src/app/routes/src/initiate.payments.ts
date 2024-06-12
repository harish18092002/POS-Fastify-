import {
  IPaymentsInterface,
  ITransactionInterface,
  TResponse,
  orderIdValidators,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin/index';
import { paymentsHistory } from '@prisma/client';
import { generateID } from '@jetit/id';

export async function initiatePayments(
  data: ITransactionInterface
): Promise<TResponse<paymentsHistory>> {
  const ps = prismaClientAssign();

  try {
    orderIdValidators(data.orderId);
    const entryId = generateID('HEX', '05');

    const details = await ps.orderDetails.findFirst({
      where: {
        orderId: data.orderId,
      },
    });
    const paymentDetails = await ps.paymentsHistory.findFirst({
      where: {
        orderId: data.orderId,
      },
    });

    if (!details) {
      return {
        data: null,
        message: 'Order not found',
        status: 'ERROR',
      };
    } else {
      if (!paymentDetails) {
        const paymentId = generateID('HEX', '04');

        const newPayment = await ps.paymentsHistory.create({
          data: {
            entryId: entryId,
            amount: data.amount,
            orderId: details.orderId,
            paymentStatus: 'PENDING',
            paymentId: paymentId,
          },
        });

        return {
          data: { paymentId: newPayment.paymentId },
          message: 'Order payment has been initiated ',
          status: 'SUCCESS',
        };
      } else {
        const newPayment = await ps.paymentsHistory.create({
          data: {
            entryId: entryId,
            amount: data.amount,
            orderId: details.orderId,
            paymentStatus: 'PENDING',
            paymentId: paymentDetails.paymentId,
          },
        });

        return {
          data: { paymentId: newPayment.paymentId },
          message: 'Order payment has been initiated ',
          status: 'SUCCESS',
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
