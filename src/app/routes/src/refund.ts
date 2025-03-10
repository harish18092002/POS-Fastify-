import { paymentsHistory } from '@prisma/client';
import { prismaClientAssign } from '../../prismaPlugin/index';
import {
  ITransactionInterface,
  TResponse,
  orderIdValidators,
} from '../../utils';
import { generateID } from '@jetit/id';

export async function refund(
  data: ITransactionInterface
): Promise<TResponse<paymentsHistory>> {
  const ps = prismaClientAssign();
  try {
    orderIdValidators(data.orderId);
    const paymentDetails = await ps.paymentsHistory.findMany({
      where: {
        orderId: data.orderId,
      },
    });

    if (!paymentDetails) {
      return {
        data: null,
        message: 'Incorrect Payment ID',
        status: 'ERROR',
      };
    }

    let completedPayments = [];
    let isRefunded = false;
    let isCompleted = false;
    let totalAmountPaid = 0;
    let paymentId = '';
    let count = 0;
    for (const payment of paymentDetails) {
      paymentId = payment.paymentId;
      if (payment.paymentStatus === 'REFUNDED') {
        isRefunded = true;
      }
      if (payment.paymentStatus === 'FULLY_COMPLETED') count++;
      if (
        payment.paymentStatus === 'FULLY_COMPLETED' ||
        payment.paymentStatus === 'PARTIAL_COMPLETED'
      ) {
        completedPayments.push(payment.paymentId);
        isCompleted = true;
        totalAmountPaid += parseInt(payment.amount);
      }
    }
    if (count === 0) {
      return {
        data: null,
        message: 'Payment can be refunded only if full payment is completed',
        status: 'ERROR',
      };
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

    await ps.paymentsHistory.create({
      data: {
        entryId: generateID('HEX', '05'),
        amount: totalAmountPaid.toString(),
        paymentId: paymentId,
        orderId: data.orderId,
        paymentStatus: 'REFUNDED',
      },
    });

    return {
      data: null,
      message: `The total amount to be refunded is ${totalAmountPaid}`,
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
