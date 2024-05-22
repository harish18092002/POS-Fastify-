import { IItemInterface, IOrderInterface, ITaxInterface } from './interface';

export function itemValidator(data: IOrderInterface) {
  data.item.forEach((items) => {
    nameValidator(items.name);
    descriptionValidator(items.description);
    quantityValidator(items.quantity);
    amountValidator(items.amount);

    items.tax.map((tax) => {
      taxTypeValidator(tax.taxType);
      taxAmountValidator(tax.taxAmount);
    });
  });
}

export function nameValidator(name: string) {
  const stringValidation = stringValidators(name);
  if (!stringValidation && name !== null)
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
export function taxTypeValidator(taxType: string) {
  const stringValidation = stringValidators(taxType);
  if (!stringValidation)
    throw new Error('The amount should be a string of lenght 50 ');
}
export function taxAmountValidator(taxAmount: string) {
  const stringValidation = stringValidators(taxAmount);
  if (!stringValidation)
    throw new Error('The amount should be a string of lenght 50 ');
}
export function orderIdValidators(orderId: string) {
  const stringLength = orderId.length;
  const lastchar =
    orderId.charAt(stringLength - 2) + orderId.charAt(stringLength - 1);
  console.log(lastchar);
}

export function stringValidators(data: string) {
  if (data.length <= 50 && typeof data == 'string') return true;
  else return false;
}
