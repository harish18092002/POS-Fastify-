import { payments } from '@prisma/client';
import {
  IPaymentsInterface,
  TResponse,
  paymentIdValidators,
  paymentValidator,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin';

export async function payments(
  data: IPaymentsInterface
): Promise<TResponse<payments>> {
  const ps = prismaClientAssign();

  try {
    paymentValidator(data);
    paymentIdValidators(data.paymentId);
    const details = await ps.payments.findMany({
      where: {
        paymentId: data.paymentId,
      },
    });

    if (!details) {
      return {
        data: null,
        message: 'Incorrect Payment ID',
        status: 'ERROR',
      };
    }

    const existingPayments = details;
    let paymentId = '';
    console.log(existingPayments);
    let isRefunded = false;
    let isCompleted = false;
    let isPending = false;

    for (let i = 0; i < existingPayments.length; i++) {
      paymentId = existingPayments[0].paymentId;
      if (existingPayments[i].paymentStatus === 'REFUNDED') {
        isRefunded = true;
      } else if (existingPayments[i].paymentStatus === 'COMPLETED') {
        isCompleted = true;
      } else if (existingPayments[i].paymentStatus === 'PENDING') {
        isPending = true;
      }
    }

    if (isRefunded || isCompleted) {
      return {
        data: null,
        message: 'Payment has been refunded or completed already',
        status: 'ERROR',
      };
    }

    if (!isPending) {
      return {
        data: null,
        message: 'Payment not initiated',
        status: 'ERROR',
      };
    }

    const initiatePayments = await ps.payments.create({
      data: {
        orderId: details[0].orderId,
        paymentStatus: data.paymentStatus,
        paymentId: paymentId,
      },
    });

    return {
      data: { paymentId: paymentId },
      message: 'Payment has been ' + data.paymentStatus,
      status: 'SUCCESS',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Error occurred during updating the payment',
    };
  }
}
