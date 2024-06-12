import { paymentsHistory } from '@prisma/client';
import {
  ITransactionInterface,
  TResponse,
  orderIdValidators,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin';
export async function getOrderPayments(
  data: ITransactionInterface
): Promise<TResponse<paymentsHistory>> {
  const ps = prismaClientAssign();
  try {
    orderIdValidators(data.orderId);
    const orderDetails = await ps.orderDetails.findFirst({
      where: {
        orderId: data.orderId,
      },
    });

    if (!orderDetails)
      return {
        data: null,
        message: 'Incorrect order ID ',
        status: 'ERROR',
      };

    const transactionDetails = await ps.paymentsTransaction.findMany({
      where: {
        orderId: data.orderId,
      },
    });
    if (!transactionDetails) {
      return {
        data: null,
        message: 'No transaction has been completed to this order ',
        status: 'ERROR',
      };
    } else {
      return {
        data: transactionDetails,
        message: 'All transaction has been fetched ',
        status: 'SUCCESS',
      };
    }
  } catch (error) {
    return {
      data: null,
      message: error.message,
      status: 'ERROR',
    };
  }
}
