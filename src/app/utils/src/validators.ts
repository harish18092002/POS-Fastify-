import { validateId } from '@jetit/id';
import { IOrderInterface } from './interface';

export function itemValidator(data: IOrderInterface) {
  data.item.forEach((items) => {
    if (items.hasOwnProperty('name') && items.name !== '') {
      nameValidator(items.name);
    } else {
      throw new Error('Name is missing');
    }

    if (items.hasOwnProperty('description') && items.description !== '') {
      descriptionValidator(items.description);
    } else {
      throw new Error('Description is missing');
    }

    if (items.hasOwnProperty('quantity') && items.quantity !== '') {
      quantityValidator(items.quantity);
    } else {
      throw new Error('Quantity is missing');
    }
    if (items.hasOwnProperty('amount') && items.amount !== '') {
      amountValidator(items.amount);
    } else {
      throw new Error('Amount is missing');
    }

    items.tax.map((tax) => {
      taxTypeValidator(tax.taxType);
      taxAmountValidator(tax.taxAmount);
    });
  });
}

export function nameValidator(name: string) {
  const stringValidation = stringValidators(name);
  if (!stringValidation && name !== null) {
    throw new Error(
      'The name of the item should be a string of length 50 and it should not to be a empty value'
    );
  }
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
  try {
    const orderIdvalidation = validateId(orderId, 'HEX', '01');
  } catch (error) {
    throw new Error('Enter a valid order ID');
  }
}

export function itemIdValidators(itemId: string) {
  try {
    const itemIdvalidation = validateId(itemId, 'HEX', '02');
  } catch (error) {
    throw new Error('Enter a valid Item ID');
  }
}
export function stringValidators(data: string) {
  if (data.length <= 50 && typeof data == 'string') return true;
  else return false;
}
