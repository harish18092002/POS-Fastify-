import { paymentStatus, paymentsHistory } from '@prisma/client';
import { prismaClientAssign } from '../../prismaPlugin/index';
import {
  IPaymentsInterface,
  TResponse,
  orderIdValidators,
  paymentIdValidators,
} from '../../utils';

export async function refund(data: any): Promise<TResponse<paymentsHistory>> {
  const ps = prismaClientAssign();
  try {
    orderIdValidators(data.orderId);
    const [paymentDetails, orderDetails] = await ps.$transaction([
      ps.paymentsHistory.findMany({
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

    if (!paymentDetails) {
      return {
        data: null,
        message: 'Incorrect Payment ID',
        status: 'ERROR',
      };
    }

    const totalAmount = orderDetails.totalAmount;
    let completedPayments = [];
    let isRefunded = false;
    let isCompleted = false;

    for (const payment of paymentDetails) {
      if (payment.paymentStatus === 'REFUNDED') {
        isRefunded = true;
      }
      if (payment.paymentStatus === 'COMPLETED') {
        completedPayments.push(payment.paymentId);
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
    const arr = [];
    for (let i = 0; i < completedPayments.length; i++) {
      arr.push(
        ps.paymentsHistory.create({
          data: {
            amount: data.amount,
            paymentId: completedPayments[i],
            orderId: data.orderId,
            paymentStatus: 'REFUNDED',
          },
        })
      );
    }
    await ps.$transaction(arr);
    console.log(arr);
    return {
      data: null,
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
