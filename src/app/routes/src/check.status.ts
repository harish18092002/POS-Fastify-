import { paymentsHistory } from '@prisma/client';
import {
  IPaymentsInterface,
  TResponse,
  paymentIdValidators,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin';

export async function checkPaymentStatus(
  data: IPaymentsInterface
): Promise<TResponse<paymentsHistory>> {
  const ps = prismaClientAssign();
  try {
    paymentIdValidators(data.paymentId);
    const details = await ps.paymentsHistory.findMany({
      where: {
        paymentId: data.paymentId,
      },
    });

    if (!details)
      return {
        data: null,
        message: 'Incorrect Payment ID',
        status: 'ERROR',
      };

    return {
      data: details,
      message: 'Payment status has been fetched successfully',
      status: 'SUCCESS',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Error occurred during fetching the payment status',
    };
  }
}
