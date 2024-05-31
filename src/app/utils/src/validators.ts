import { validateId } from '@jetit/id';
import { IItemInterface, IOrderInterface } from './interface';
import { ascending, reverseNumber, wordsCheck } from '../../../app/test';
import { problems } from '../../../app/prblms';

export function itemValidator(data: IOrderInterface) {
  problems();
  ascending();
  wordsCheck();
  reverseNumber();
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

    console.log(missingKeys);
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

// // if (items.hasOwnProperty('name') && items.name.trim() !== '') {
// //   nameValidator(items.name);
// // } else {
// //   throw new Error('Name is missing or empty');
// // }

// if (items.hasOwnProperty('quantity') && items.quantity.trim() !== '') {
//   quantityValidator(items.quantity);
// } else {
//   throw new Error('Quantity is missing or empty');
// }
// if (items.hasOwnProperty('amount') && items.amount.trim() !== '') {
//   amountValidator(items.amount);
// } else {
//   throw new Error('Amount is missing or empty');
// }

// export function taxTypeValidator(taxType: string) {
//   if (
//     (stringValidators(taxType) && taxType.trim() !== '' && taxType === 'GST') ||
//     taxType === 'VAT'
//   ) {
//     return taxType;
//   } else {
//     throw new Error(
//       'The tax type should be a string of either GST or VAT and it should not be empty'
//     );
//   }
// }

// export function taxAmountValidator(taxAmount: string) {
//   if (stringValidators(taxAmount) && taxAmount.trim() !== '') {
//     return taxAmount;
//   } else {
//     throw new Error(
//       'The tax amount should be a string of length 50 and it should not be empty'
//     );
//   }
// }

// comparing 2 arrays
// const mandatoryArray = [1, 2, 6, 8, 10, 0];
// const arr2 = [1, 9, 2, 9, 7, 8];
// const missingarray = [];
// console.log(missingarray);
// if (mandatoryArray.length !== arr2.length)
//   throw new Error('Array mismatched with mandatory array');

// for (let i = 0; i < mandatoryArray.length; i++) {
//   for (let j = 0; j <= arr2.length; j++) {
//     if (mandatoryArray[i] === arr2[j]) break;
//     if (j === arr2.length) missingarray.push(mandatoryArray[i]);
//     throw new Error('Mandatory array element not is secondary array');
//   }
// }

// mandatoryArray.every((v) => arr2.includes(v));
