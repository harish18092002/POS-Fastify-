export interface IOrderInterface {
  orederId: string;
  orderedItem: IItemInterface;
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
  tax: string;
}
