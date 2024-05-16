export interface ICreateOrder {
  id: string;
  name: string;
  description: string;
  quantity: string;
  tax: string;
  amount: string;
}

export interface IOrderInterface {
  orederId: string;
  name: string;
  quantity: string;
  amount: string;
  status: 'ACCEPTED' | 'CANCELLED';
}
