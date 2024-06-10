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
  orderId: string;
  totalAmount: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
}
