export interface IOrderInterface {
  orederId: string;
  item: [IItemInterface];
  status: 'ACCEPTED' | 'CANCELLED';
}

export interface IItemInterface {
  itemId: string;
  name: string;
  description: string;
  quantity: string;
  tax: ITaxInterface;
  amount: string;
}
export interface ITaxInterface {
  gst: string;
  sgst: string;
}
