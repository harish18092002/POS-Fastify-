export interface IOrderInterface {
  orederId: string;
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
