import { OrderDetails } from '@prisma/client';
import { IOrderInterface, orderIdValidators, TResponse } from '../../utils';
import { prismaClientAssign } from '../../prismaPlugin/plugins/prismaPlugin';

export async function cancelOrder(
  data: IOrderInterface
): Promise<TResponse<OrderDetails>> {
  try {
    orderIdValidators(data.orderId);
    const ps = prismaClientAssign();
    const findOrder = await ps.orderDetails.findFirst({
      where: {
        orderId: data.orderId,
      },
    });

    if (!findOrder) throw new Error('order ID does not exist ');

    if (findOrder.status !== 'CANCELLED') {
      const updateOrder = await ps.orderDetails.update({
        where: {
          orderId: data.orderId,
        },
        data: {
          status: 'CANCELLED',
        },
      });
    } else {
      return {
        status: 'ERROR',
        message: 'Order has been cancelled already ',
        data: null,
      };
    }

    return {
      status: 'SUCCESS',
      message: ' Order has been cancelled successfully',
      data: data.orderId,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error,
      message: error.message,
    };
  }
}

// function isArmstrong(num: number): boolean {
//   let originalNum = num;
//   let sum = 0;
//   while (num > 0) {
//       let digit = num % 10;
//       sum += digit * digit * digit;
//       num = (num - digit) / 10;
//   }
//   return sum === originalNum;
// }

// function generateArmstrongNumbers(current: number): void {
//   if (current > 500) return;

//   if (isArmstrong(current)) {
//       console.log(current);
//   }

//   generateArmstrongNumbers(current + 1);
// }

// generateArmstrongNumbers(100);

// function sumSeries(terms: number): void {
//   function sumRecursive(currentTerm: number, currentNumber: number, accumulatedSum: number, remainingTerms: number): void {
//       if (remainingTerms === 0) {
//           console.log("The sum of the series =", accumulatedSum);
//           return;
//       }

//       console.log(currentNumber);
//       accumulatedSum += currentNumber;
//       currentNumber = currentNumber * 10 + 9;

//       sumRecursive(currentTerm + 1, currentNumber, accumulatedSum, remainingTerms - 1);
//   }

//   sumRecursive(1, 9, 0, terms);
// }

// sumSeries(5);
