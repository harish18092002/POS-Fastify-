export interface IOrderInterface {
  totalAmount: string;
  orderId: string;
  item: Array<IItemInterface>;
  status: 'ACCEPTED' | 'CANCELLED';
}
export interface IItemInterface {
  itemId: string;
  name: string;
  description: string;
  quantity: string;
  tax: Array<ITaxInterface>;
  amount: string;
}
export interface ITaxInterface {
  taxId: string;
  taxType: 'GST' | 'VAT';
  taxAmount: string;
}

export interface IPaymentsInterface {
  paymentId: string;
  orderId: string;
  totalAmount: string;
  paymentStatus:
    | 'PENDING'
    | 'PARTIAL_COMPLETED'
    | 'FULLY_COMPLETED'
    | 'CANCELLED'
    | 'REFUNDED'
    | 'PARTIAL';
}
export interface ITransactionInterface {
  transactionId: string;
  paymentId: string;
  orderId: string;
  amount: string;
  paymentStatus:
    | 'PENDING'
    | 'PARTIAL_COMPLETED'
    | 'FULLY_COMPLETED'
    | 'CANCELLED'
    | 'REFUNDED'
    | 'PARTIAL';
}
