import { validateId } from '@jetit/id';
import {
  IItemInterface,
  IOrderInterface,
  IPaymentsInterface,
} from './interface';
import { ascending, reverseNumber, wordsCheck } from '../../../app/test';
import { problems } from '../../Problems/prblms';

export function itemValidator(data: IOrderInterface) {
  // problems();
  // ascending();
  // wordsCheck();
  // reverseNumber();
  data.item.forEach((items) => {
    validators(items);
    if (
      !(
        items.hasOwnProperty('tax') &&
        Array.isArray(items.tax) &&
        items.tax.length > 0
      )
    )
      throw new Error('Tax information is missing or empty');
  });
}

function vdata(data) {
  if (typeof data === 'string' && stringValidators(data) && data.trim() !== '')
    return true;
  return false;
}

function validators(items: IItemInterface) {
  try {
    const userkeys = Object.keys(items);

    const missingKeys = [];
    const interfaceKeys = ['name', 'description', 'quantity', 'amount', 'tax'];

    for (let i = 0; i < interfaceKeys.length; i++) {
      for (let j = 0; j <= userkeys.length; j++) {
        if (interfaceKeys[i] === userkeys[j]) break;
        if (j === userkeys.length) {
          missingKeys.push(interfaceKeys[i]);
        }
      }
    }
    if (missingKeys.length > 0)
      throw new Error(missingKeys.join(', ') + ' is mandatory');

    userkeys.forEach((v) => {
      if (Array.isArray(items[v]) && items[v].length > 0) {
        items[v].forEach((tax) => {
          if (!vdata(tax['taxType'])) throw 'taxType is mandatory';
          if (!vdata(tax['taxAmount'])) throw 'taxAmount is mandatory';
        });
      } else if (!vdata(items[v])) throw v + ' should not be empty';
    });
  } catch (e) {
    throw new Error(e);
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
export function paymentStatusValidator(data: IPaymentsInterface) {
  const mandatorKeys = ['orderId', 'paymentStatus'];
  const userKeys = Object.keys(data);
  const missingKeys = [];
  for (let i = 0; i < mandatorKeys.length; i++) {
    for (let j = 0; j < userKeys.length; j++) {
      if (mandatorKeys[i] === userKeys[j]) break;
      else {
        if (j === userKeys.length - 1) {
          missingKeys.push(mandatorKeys[i]);
        }
      }
    }
  }
  if (missingKeys.length > 0)
    throw new Error(missingKeys.join(',') + ' is mandatory');
}
