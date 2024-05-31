import { wrap } from 'module';

//ascending of arrays
export function ascending() {
  const arr1 = [8, -10, 3, 6, 4, 1, 2, 5];

  for (let i = 0; i < arr1.length - 1; i++) {
    for (let j = i + 1; j < arr1.length; j++) {
      if (arr1[i] > arr1[j]) {
        const first = arr1[i];
        arr1[i] = arr1[j];
        arr1[j] = first;
      }
    }
  }
  // console.log(arr1);

  // const swapping = swapFunciton([arr1[i], arr1[j]]);
  // ascend.push(swapping);
  //   swap function
  //   const a = [1, 2];
  // const sw = swapFunciton(a);
  // console.log(sw);
}
function swapFunciton(a) {
  //   console.log(a);
  const first = a[0];
  const sw = [(a[0] = a[1]), (a[1] = first)];
  return sw;
}

export function wordsCheck() {
  const mainStr = 'ssstarqwwsdfffhstar';
  const subStr = 'star';
  const constants = { count: 0, match: true };

  if (subStr.length > mainStr.length) {
    throw new Error('Substring is not present in main string');
  }
  for (let i = 0; i <= mainStr.length; i++) {
    constants.match = true;
    for (let j = 0; j < subStr.length; j++) {
      if (mainStr[i + j] !== subStr[j]) {
        constants.match = false;
        break;
      } else if (j === subStr.length - 1) {
        console.log('Main string contains the substring elements');
      }
    }
    if (constants.match) {
      constants.count += 1;
    }
  }
  // console.log(constants.count);
}

export function reverseNumber() {
  const input = 128;
  let count = 1;

  // for (let i = 10; i <= input; i = i * 10) {
  //   count++;
  // }
  // let j = count;
  // while (j >= 0) {
  //   let num = Math.floor(input / Math.pow(10, j)) % 10;
  //   console.log(num);
  //   j--;
  // }

  // for (let j = count; j >= 0; j--) {}

  // const first = Math.floor(input / 100) % 10;

  // const second = Math.floor(input / 10) % 10;
  // const third = Math.floor(input % 10);

  let n = input;
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum = sum * 10 + digit;
    n = Math.floor(n / 10);
  }
  // console.log(sum);

  // console.log(first);
}
