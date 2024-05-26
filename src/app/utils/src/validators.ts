import { validateId } from '@jetit/id';
import { IOrderInterface } from './interface';

export function itemValidator(data: IOrderInterface) {
  data.item.forEach((items) => {
    if (items.hasOwnProperty('name') && items.name.trim() !== '') {
      nameValidator(items.name);
    } else {
      throw new Error('Name is missing or empty');
    }

    if (
      items.hasOwnProperty('description') &&
      items.description.trim() !== ''
    ) {
      descriptionValidator(items.description);
    } else {
      throw new Error('Description is missing or empty');
    }

    if (items.hasOwnProperty('quantity') && items.quantity.trim() !== '') {
      quantityValidator(items.quantity);
    } else {
      throw new Error('Quantity is missing or empty');
    }
    if (items.hasOwnProperty('amount') && items.amount.trim() !== '') {
      amountValidator(items.amount);
    } else {
      throw new Error('Amount is missing or empty');
    }

    if (
      items.hasOwnProperty('tax') &&
      Array.isArray(items.tax) &&
      items.tax.length > 0
    ) {
      items.tax.forEach((tax) => {
        if (tax.taxType.trim() !== '') {
          taxTypeValidator(tax.taxType);
        } else {
          throw new Error('Tax type is missing or empty');
        }

        if (tax.taxAmount.trim() !== '') {
          taxAmountValidator(tax.taxAmount);
        } else {
          throw new Error('Tax amount is missing or empty');
        }
      });
    } else {
      throw new Error('Tax information is missing or empty');
    }
  });
}

export function nameValidator(name: string) {
  if (!stringValidators(name)) {
    throw new Error(
      'The name of the item should be a string of length 50 and it should not be an empty value'
    );
  }
  return name;
}

export function descriptionValidator(description: string) {
  if (!stringValidators(description)) {
    throw new Error(
      'The description should be a string of length 50 and it should not be empty'
    );
  }
}

export function quantityValidator(quantity: string) {
  if (!stringValidators(quantity)) {
    throw new Error(
      'The quantity should be a string of length 50 and it should not be empty'
    );
  }
}

export function amountValidator(amount: string) {
  if (!stringValidators(amount)) {
    throw new Error(
      'The amount should be a string of length 50 and it should not be empty'
    );
  }
}

export function taxTypeValidator(taxType: string) {
  if (!stringValidators(taxType)) {
    throw new Error(
      'The tax type should be a string of length 50 and it should not be empty'
    );
  }
}

export function taxAmountValidator(taxAmount: string) {
  if (!stringValidators(taxAmount)) {
    throw new Error(
      'The tax amount should be a string of length 50 and it should not be empty'
    );
  }
}

export function orderIdValidators(orderId: string) {
  try {
    validateId(orderId, 'HEX', '01');
  } catch (error) {
    throw new Error('Enter a valid order ID');
  }
}

export function itemIdValidators(itemId: string) {
  try {
    validateId(itemId, 'HEX', '02');
  } catch (error) {
    throw new Error('Enter a valid Item ID');
  }
}

export function stringValidators(data: string) {
  return (
    data.trim().length <= 50 &&
    typeof data === 'string' &&
    data.trim().length > 0
  );
}
