import { payments } from '@prisma/client';
import {
  IPaymentsInterface,
  TResponse,
  orderIdValidators,
  paymentStatusValidator,
  stringValidators,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin';
import { generateID } from '@jetit/id';

export async function payments(
  data: IPaymentsInterface
): Promise<TResponse<payments>> {
  const ps = prismaClientAssign();

  try {
    // Validators
    paymentStatusValidator(data);
    orderIdValidators(data.orderId);

    const details = await ps.$transaction([
      ps.orderDetails.findFirst({
        where: {
          orderId: data.orderId,
        },
      }),
      ps.payments.findMany({
        where: {
          orderId: data.orderId,
        },
      }),
    ]);

    if (!details[0]) {
      return {
        data: null,
        message: 'Incorrect Order ID',
        status: 'ERROR',
      };
    }

    const existingPayments = details[1];
    let isRefunded = false;
    let isCompleted = false;
    let isPending = false;

    for (let i = 0; i < existingPayments.length; i++) {
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

    const paymentId = generateID('HEX', '04');
    const initiatePayments = await ps.payments.create({
      data: {
        orderId: data.orderId,
        paymentStatus: data.paymentStatus,
        paymentId: paymentId,
      },
    });

    return {
      data: initiatePayments,
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
