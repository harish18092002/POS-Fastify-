import { paymentsHistory } from '@prisma/client';
import {
  IPaymentsInterface,
  TResponse,
  paymentIdValidators,
  paymentValidator,
} from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin';
import { generateID } from '@jetit/id';

export async function payments(
  data: IPaymentsInterface
): Promise<TResponse<paymentsHistory>> {
  const ps = prismaClientAssign();

  try {
    paymentValidator(data);
    paymentIdValidators(data.paymentId);
    const entryId = generateID('HEX', '05');

    const paymentDetails = await ps.paymentsHistory.findMany({
      where: {
        paymentId: data.paymentId,
      },
    });

    if (!paymentDetails) {
      return {
        data: null,
        message: 'Incorrect Payment ID',
        status: 'ERROR',
      };
    }

    const orderDetails = await ps.orderDetails.findFirst({
      where: {
        orderId: paymentDetails[paymentDetails.length - 1].orderId,
      },
    });

    if (!orderDetails) {
      return {
        data: null,
        message: 'Order not found',
        status: 'ERROR',
      };
    }

    if (data.paymentStatus === 'CANCELLED')
      return {
        data: null,
        message: 'Payment has been cancelled successfully',
        status: 'ERROR',
      };
    const totalAmount = parseInt(orderDetails.totalAmount);

    const completedPayment = await ps.paymentsHistory.findFirst({
      where: {
        orderId: paymentDetails[paymentDetails.length - 1].orderId,
        paymentStatus: 'FULLY_COMPLETED',
      },
    });

    if (completedPayment) {
      return {
        data: null,
        message: 'Payment already completed for this order',
        status: 'ERROR',
      };
    }

    const existingPartialPayments = await ps.paymentsHistory.findMany({
      where: {
        orderId: paymentDetails[paymentDetails.length - 1].orderId,
        paymentStatus: 'PARTIAL_COMPLETED',
      },
    });

    const totalPaid = existingPartialPayments.reduce(
      (sum, payment) => sum + parseInt(payment.amount),
      0
    );
    if (totalPaid === totalAmount)
      return {
        data: null,
        message: 'Payment already completed for this order in partial order',
        status: 'ERROR',
      };

    const newTotalPaid =
      totalPaid + parseInt(paymentDetails[paymentDetails.length - 1].amount);
    const remainingAmount = totalAmount - totalPaid;

    if (newTotalPaid > totalAmount) {
      return {
        data: null,
        message: `Payment is greater than the total order amount and amount to be paid is : ${remainingAmount}`,
        status: 'ERROR',
      };
    }
    let paymentDetailsAmount = 0;
    for (let i = 0; i < paymentDetails.length; i++) {
      paymentDetailsAmount = parseInt(paymentDetails[i].amount);
    }
    if (
      paymentDetailsAmount < remainingAmount ||
      paymentDetailsAmount < totalAmount
    ) {
      if (paymentDetailsAmount + totalPaid === totalAmount) {
        await ps.$transaction([
          ps.paymentsHistory.create({
            data: {
              entryId: entryId,
              paymentId: data.paymentId,
              orderId: paymentDetails[paymentDetails.length - 1].orderId,
              amount: paymentDetails[paymentDetails.length - 1].amount,
              paymentStatus: 'FULLY_COMPLETED',
            },
          }),
          ps.paymentsTransaction.create({
            data: {
              transactionId: generateID('HEX', '05'),
              orderId: paymentDetails[paymentDetails.length - 1].orderId,
              amount: paymentDetails[paymentDetails.length - 1].amount,
              paymentStatus: 'FULLY_COMPLETED',
              paymentId: data.paymentId,
            },
          }),
        ]);

        return {
          data: { paymentId: data.paymentId },
          message: `Partial payment initiated for amount: ${
            paymentDetails[paymentDetails.length - 1].amount
          } and all payments for this order has been completed`,
          status: 'SUCCESS',
        };
      } else {
        await ps.$transaction([
          ps.paymentsHistory.create({
            data: {
              entryId: entryId,
              paymentId: data.paymentId,
              orderId: paymentDetails[paymentDetails.length - 1].orderId,
              amount: paymentDetails[paymentDetails.length - 1].amount,
              paymentStatus: 'PARTIAL_COMPLETED',
            },
          }),
          ps.paymentsTransaction.create({
            data: {
              transactionId: generateID('HEX', '05'),
              orderId: paymentDetails[paymentDetails.length - 1].orderId,
              amount: paymentDetails[paymentDetails.length - 1].amount,
              paymentStatus: 'PARTIAL_COMPLETED',
              paymentId: data.paymentId,
            },
          }),
        ]);

        return {
          data: { paymentId: data.paymentId },
          message: `Partial payment initiated for amount: ${
            paymentDetails[paymentDetails.length - 1].amount
          }`,
          status: 'SUCCESS',
        };
      }
    } else if (newTotalPaid === totalAmount) {
      await ps.paymentsHistory.create({
        data: {
          entryId: entryId,
          paymentId: data.paymentId,
          orderId: paymentDetails[paymentDetails.length - 1].orderId,
          amount: paymentDetails[paymentDetails.length - 1].amount,
          paymentStatus: 'FULLY_COMPLETED',
        },
      });

      await ps.paymentsTransaction.create({
        data: {
          transactionId: generateID('HEX', '05'),
          orderId: paymentDetails[paymentDetails.length - 1].orderId,
          amount: paymentDetails[paymentDetails.length - 1].amount,
          paymentStatus: 'FULLY_COMPLETED',
          paymentId: data.paymentId,
        },
      });

      return {
        data: { paymentId: data.paymentId },
        message: `Payment completed successfully for total order amount`,
        status: 'SUCCESS',
      };
    } else {
      return {
        data: null,
        message: `Overpayment error. Payment amount exceeds total order amount.`,
        status: 'ERROR',
      };
    }
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.message,
      message: 'Error occurred during updating the payment',
    };
  }
}
