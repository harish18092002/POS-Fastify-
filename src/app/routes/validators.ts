import { IItemInterface, IOrderInterface } from './interface';

export function itemValidator(data: IOrderInterface) {
  data.item.forEach((items) => {
    nameValidator(items.name);
    descriptionValidator(items.description);
    quantityValidator(items.quantity);
    amountValidator(items.amount);
  });
}
export function nameValidator(name: string) {
  const stringValidation = stringValidators(name);
  if (!stringValidation)
    throw new Error('The name of the item should be a string of length 50');
  return name;
}
export function descriptionValidator(description: string) {
  const stringValidation = stringValidators(description);
  if (!stringValidation)
    throw new Error('The description should be a string of lenght 50 ');
}
export function quantityValidator(quantity: string) {
  const stringValidation = stringValidators(quantity);
  if (!stringValidation)
    throw new Error('The quantity should be a string of lenght 50 ');
}
export function amountValidator(amount: string) {
  const stringValidation = stringValidators(amount);
  if (!stringValidation)
    throw new Error('The amount should be a string of lenght 50 ');
}

export function stringValidators(data: string) {
  if (data.length <= 50 && typeof data == 'string') return true;
  else return false;
}
