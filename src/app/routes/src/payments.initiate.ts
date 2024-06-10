import { OrderDetails, payments } from '@prisma/client';
import { IPaymentsInterface, TResponse } from 'src/app/utils';

export async function payments(
  data: IPaymentsInterface
): Promise<TResponse<payments>> {
  return { data: '', message: '', status: 'SUCCESS' };
}
