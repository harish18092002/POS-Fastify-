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

    const paymentDetails = await ps.paymentsHistory.findFirst({
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
        orderId: paymentDetails.orderId,
      },
    });

    if (!orderDetails) {
      return {
        data: null,
        message: 'Order not found',
        status: 'ERROR',
      };
    }

    const totalAmount = parseInt(orderDetails.totalAmount);

    const completedPayment = await ps.paymentsHistory.findFirst({
      where: {
        orderId: paymentDetails.orderId,
        paymentStatus: 'COMPLETED',
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
        orderId: paymentDetails.orderId,
        paymentStatus: 'PARTIAL',
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

    const newTotalPaid = totalPaid + parseInt(paymentDetails.amount);
    const remainingAmount = totalAmount - totalPaid;

    if (newTotalPaid > totalAmount)
      return {
        data: null,
        message: `Payment is greater than the total order amount and amount to be paid is : ${remainingAmount}`,
        status: 'ERROR',
      };
    console.log({ totalPaid, remainingAmount, newTotalPaid });
    console.log(parseInt(paymentDetails.amount));
    if (
      parseInt(paymentDetails.amount) < remainingAmount ||
      parseInt(paymentDetails.amount) < totalAmount
    ) {
      const partialPaymentId = generateID('HEX', '04');
      if (parseInt(paymentDetails.amount) + totalPaid === totalAmount) {
        await ps.$transaction([
          ps.paymentsHistory.create({
            data: {
              paymentId: partialPaymentId,
              orderId: paymentDetails.orderId,
              amount: paymentDetails.amount,
              paymentStatus: 'PARTIAL',
            },
          }),
          ps.paymentsTransaction.create({
            data: {
              transactionId: generateID('HEX', '05'),
              orderId: paymentDetails.orderId,
              amount: paymentDetails.amount,
              paymentType: 'PARTIAL',
              paymentStatus: 'COMPLETED',
              paymentId: partialPaymentId,
            },
          }),
        ]);

        return {
          data: { paymentId: partialPaymentId },
          message: `Partial payment initiated for amount: ${paymentDetails.amount} and all payments for this order has been completed`,
          status: 'SUCCESS',
        };
      } else {
        await ps.$transaction([
          ps.paymentsHistory.create({
            data: {
              paymentId: partialPaymentId,
              orderId: paymentDetails.orderId,
              amount: paymentDetails.amount,
              paymentStatus: 'PARTIAL',
            },
          }),
          ps.paymentsTransaction.create({
            data: {
              transactionId: generateID('HEX', '05'),
              orderId: paymentDetails.orderId,
              amount: paymentDetails.amount,
              paymentType: 'PARTIAL',
              paymentStatus: 'PARTIAL',
              paymentId: partialPaymentId,
            },
          }),
        ]);

        return {
          data: { paymentId: partialPaymentId },
          message: `Partial payment initiated for amount: ${paymentDetails.amount}`,
          status: 'SUCCESS',
        };
      }
    } else if (newTotalPaid === totalAmount) {
      const completedPaymentId = generateID('HEX', '04');
      await ps.paymentsHistory.create({
        data: {
          paymentId: completedPaymentId,
          orderId: paymentDetails.orderId,
          amount: paymentDetails.amount,
          paymentStatus: 'COMPLETED',
        },
      });

      await ps.paymentsTransaction.create({
        data: {
          transactionId: generateID('HEX', '05'),
          orderId: paymentDetails.orderId,
          amount: paymentDetails.amount,
          paymentType: 'FULL',
          paymentStatus: 'COMPLETED',
          paymentId: completedPaymentId,
        },
      });

      return {
        data: { paymentId: completedPaymentId },
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
