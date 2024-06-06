// // Problems
export function problems() {
  //   // Problem 1
  const str = 'I am a intern in Surfboard payments';
  for (let i = 1; i <= 7; i++) {
    console.log('Problem1 ', str);
  }
  //   // Problem 2
  for (let i = 1; i <= 100; i++) {
    console.log('Problem2 ', i);
  }
  // Problem 3
  for (let i = 1; i <= 100; i++) {
    if (i % 2 == 0) console.log('Even : ', i);
    else console.log('Odd : ', i);
  }
  // Problem 4
  const inputNumber = 45;
  for (let i = inputNumber; i <= 100 + inputNumber; i++) {
    console.log(i);
  }
  // Problem 5
  let sum4 = 0;
  for (let i = 1; i <= 100; i++) {
    sum4 = i + sum4;
  }
  console.log('Problem5 ', sum4);
  // Problem 6
  const words1 = 'abcdefghijklmnopqrstuvwxyz';
  const alphabets1 = words1.split(',').forEach((letters) => {
    console.log(letters);
  });
  // Problem 7
  const userInput1 = 20;
  for (let i = userInput1; i <= 100 + userInput1; i++) {
    if (i % 2 === 0) console.log('Even : ', i);
    else console.log('Odd : ', i);
  }
  // Problem 8
  const arr1 = [1, 2, 3, 4, 5];
  let add = arr1.reduce((acc, red) => acc + red, 0);
  console.log('Problem8 ', add);
  // Problem 9
  const userValue = 45;
  let sum1 = 0;
  for (let i = userValue + 1; i <= 50 + userValue; i++) {
    sum1 = sum1 + i;
  }
  console.log('Problem9 ', sum1);
  // Problem 10
  const pattern = 8;
  for (let i = 1; i <= 5; i++) {
    let line = '';
    for (let j = 1; j <= i; j++) {
      line = line + pattern;
    }
    console.log(line);
  }
  // Problem 11
  const num = '12345';
  let sum3 = 0;
  let l = 0;
  while (l < num.length) {
    sum3 = parseInt(num[l]) + sum3;
    l++;
  }
  console.log('This is sum of the given num ' + sum3);
  // Problem 12
  const alphabets2 = 'abcdefghijklmnopqrstuvwxyz';
  let j = 0;
  while (j < alphabets2.length) {
    const letters = alphabets2[j];
    console.log(letters);
    j++;
  }
  // Problem 13
  const arr = [10, 10, 19, 589, 90];
  let sum = arr.reduce((acc, red) => acc + red, 0);
  console.log(sum);
  while (sum.toString().length !== 1) {
    sum = sum
      .toString()
      .split('')
      .reduce((pre, cur) => pre + parseInt(cur), 0);
    console.log(sum);
  }
  console.log({ sum });
  // Problem 14
  for (let i = 100; i <= 500; i++) {
    const str = i.toString();
    let l = 0;
    const sum3 = [];
    while (l < str.length) {
      sum3.push(Math.pow(parseInt(str[l]), 3));
      if (sum3.reduce((acc, red) => acc + red, 0) === i) {
        console.log('These are the amstrong numbers:- ', i);
      }
      l++;
    }
  }
  //   // Problem 15
  const input = 5;
  let sum6 = 0;
  let i = 1;
  while (i <= input) {
    console.log(i);
    sum6 = sum6 + (Math.pow(10, i) - 1);
    i++;
  }
  console.log('This is the total of the problem 15', sum6);
  // Problem 16
  const primes = [];
  for (let i = 2; i < 100; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }
  console.log(primes);
  // Problem 17
  const userInput = 'sam';
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const arr5 = [];
  for (let i = 0; i < userInput.length; i++) {
    console.log(userInput[i]);
    for (let j = 0; j < alphabets.length; j++) {
      if (userInput[i] === alphabets[j]) {
        arr5.push(j + 1);
      }
    }
  }
  const total16 = arr5.reduce((prev, cur) => prev + cur, 0);
  console.log(total16);
  // Problem 18
  const passPhrase = 'aaa aa bb cc dd ee';
  const words = passPhrase.split(' ');
  console.log('This is split', words);
  let wordCount = {};
  let isValid = true;
  for (let i = 0; i < words.length; i++) {
    console.log(words[i]);
    if (wordCount[words[i]]) {
      isValid = false;
      console.log('The pass phrase is not valid');
      break;
    } else {
      wordCount[words[i]] = 1;
    }
  }
  if (isValid) {
    console.log(wordCount, ' This is words count');
    console.log('The pass phrase is valid');
  } else {
    console.log('The pass phrase is not valid');
  }
  // Problem 19
  const captcha = '1122211';
  let sum2 = 0;
  const lengt = captcha.length;
  for (let i = 0; i < lengt; i++) {
    const currentDigit = captcha[i];
    const nextDigit = captcha[(i + 1) % lengt];
    console.log(nextDigit);
    if (currentDigit === nextDigit) {
      sum2 += parseInt(currentDigit);
    }
  }
  console.log('This is problem 19', sum2);
  // Problem 20
  const matrix = [
    [5, 1, 9, 5],
    [5, 7, 3],
    [2, 4, 6, 8],
  ];
  console.log(matrix.length);
  let sum5 = 0;
  for (let i = 0; i < matrix.length; i++) {
    const values = matrix[i];
    console.log(values);
    let min = values[0];
    console.log(min);
    let max = values[0];
    for (let j = 1; j < values.length; j++) {
      if (values[j] < min) {
        min = values[j];
      }
      if (values[j] > max) {
        max = values[j];
      }
    }
    sum5 += max - min;
  }
  console.log('Sum of problem 20:', sum5);
  //   // Splitting a string without using split inbuild function
  const st = 'abbbb';
  console.log(st.length);
  let seperator = '';
  let letters = '';
  const arr6 = [];
  for (let i = 0; i < st.length; i++) {
    if (seperator === '') arr6.push(st[i]);
    else {
      if (st[i] !== seperator) letters += st[i];
      if (st[i] === seperator || i === st.length - 1) {
        arr6.push(letters);
        letters = '';
      }
    }
  }
  console.log(arr6);
}

// Problems set 3
// Problem 2

{
  const x = 'a' + 'b';
  console.log(x);
}

// Problem 3
function division(dividend, divisor) {
  let quotient = dividend / divisor;
  let remainder = dividend % divisor;

  return remainder;
}

console.log(division(4, 2));

// Problem 4

function sentence(a, b, c, d) {
  const finalSentence = a + ' ' + b + ' ' + c + ' ' + d;
  return finalSentence;
}
let g = 'Frame';
let h = 'a';
let i = 'sentence';
let j = 'on';
let k = 'your';
let l = 'own';

console.log(sentence(g, h, i, j));

// Problem 6
const sq = function (a) {
  return a * a;
};
const cu = function (b) {
  return b * b * b;
};
function di(j, k) {
  return j / k;
}
function problem(a, b) {
  const integer1 = sq(a);
  const integer2 = cu(b);
  const integer3 = sq(a * b);
  const integer4 = di(a, b);
  return integer1 + integer2 + integer3 + integer4;
}
const calculation = function (g, h) {
  const answer = problem(g, h);
  return answer;
};

console.log(calculation(10, 5));

// Problem 7

function mathematicalOperation(a, b) {
  let sum = a + b;
  let subtract = a - b;
  let multiplication = a * b;
  let division = a / b;
  let square1 = a * a;
  let square2 = b * b;
  let sumAll = sum + subtract + multiplication + division + square1 + square2;
  let operations = {
    sum: sum,
    subtract: subtract,
    multiplication: multiplication,
    division: division,
    square1: square1,
    square2: square2,
    sumAll: sumAll,
  };
  return operations;
}

console.log(mathematicalOperation(2, 4));

// Problem 8
const class10CMarks = {
  Maths: [89, 90, 97, 45, 72, 80, 76],
  Science: [93, 88, 83, 54, 65, 77, 70],
  SocialScience: [85, 94, 87, 40, 69, 70, 81],
  English: [88, 84, 89, 60, 79, 83, 81],
  Language: [84, 87, 92, 73, 80, 79, 84],
};

console.log(class10CMarks);

// Problem 9

const obj = {
  courseName: 'Internship',
  items: { fruit: 'Apple', colour: 'red' },
  booleanValue: true,
  arrayValue: [1, 2, 3, 4, 5],
  str: '23lock',
  func: add3(1, 3),
};

function add3(a, b) {
  return a + b;
}
console.log(obj);
// Problem 10

const teamDetails = {
  batsmen: 5,
  bowlers: 5,
  allRounders: 1,
  subs: 4,
};
function teamInfo(a, b, c) {
  a.players = b;
  a.order = c;
  return a;
}
const players11 = [
  'Sachin',
  'Sehwag',
  'Gambhir',
  'Dravid',
  'Ganguly',
  'Yuvraj',
  'Harbhajan',
  'Zaheer',
  'Nehra',
  'Kumble',
  'Irfan',
];
const battingOrder = {
  '1': 'Sehwag',
  '2': 'Gambhir',
  '3': 'Sachin',
  '4': 'Dravid',
  '5': 'Ganguly',
  '6': 'Yuvraj',
  '7': 'Irfan',
  '8': 'Harbhajan',
  '9': 'Kumble',
  '10': 'Zaheer',
  '11': 'Nehra',
};
console.log(teamInfo(teamDetails, players11, battingOrder));

// Problem 11
const groceryList = {
  tomato: '1 kg',
  potato: '1/2 kg',
  calculatePrice: function (groceryList, price, discount) {
    groceryList.price = price;
    groceryList.discount = discount;
    return groceryList;
  },
};

groceryList.calculatePrice(groceryList, 55, 25);

console.log(groceryList);

// Problem 12

const add = function (number1, number2) {
  return number1 + number2;
};
const sub = function (number1, number2) {
  return number1 - number2;
};
const mul = function (number1, number2) {
  return number1 * number2;
};
function div(number1, number2) {
  return number1 / number2;
}
const add1 = function (_function1, number1, number2) {
  function newFn(_function2, number1, number2) {
    return _function2(number1, number2);
  }
  let sum1 = _function1(number1, number2);
  let diff1 = sub(number2, number1);
  let ans1 = newFn(mul, sum1, diff1);
  let ans2 = newFn(div, sum1, diff1);
  return add(ans1, ans2);
};
console.log(add1(add, 5, 6));

// const str = 'maam';
// let m = 0;
// let count = 0;
// let n = str.length - 1;
// while (m < n) {
//   console.log({ m, n });
//   if (str[m] !== str[n]) {
//     console.log('Not a palindrom');
//     break;
//   }
//   m++;
//   n--;
//   if (m >= n) {
//     count++;
//     console.log('Palindrom');
//   }
// }

//13
const input3 = 'madamzmalayyalam';
let count = 0;
let maxDiff = 0;
let longestPalindrome = '';

for (let i = 0; i < input3.length; i++) {
  for (let j = i + 1; j < input3.length; j++) {
    let first = '',
      last = '';
    if (input3[i] === input3[j]) {
      let a = i,
        b = j;
      let diff = 0;
      let isPalindrome = true;
      while (a <= b) {
        if (input3[a] !== input3[b]) {
          isPalindrome = false;
          break;
        }

        first = first + input3[a];
        last = (a === b ? '' : input3[b]) + last;

        a++;
        b--;
      }
      if (isPalindrome) {
        let palindrome = first + last;

        if (palindrome.length > maxDiff) {
          maxDiff = palindrome.length;
          longestPalindrome = palindrome;
        }
        count++;
        // let palindrome = input3.slice(i, j + 1);
      }
    }
  }
}
console.log('This is the number of palindromes in the string:', count);
console.log('Length of the biggest palindrome:', maxDiff);
console.log('This is the biggest palindrome:', longestPalindrome);

// 14
// const arr7 = [1, 2, 3, 4, 5];
const num = 5;
let input = 16;
const arr7 = [];
let index = [];

for (let i = 1; i <= num; i++) arr7.push(i);
const total = arr7.reduce((cur, prev) => cur + prev, 0);
if (input > total)
  console.log('Given input is greater than the sum of array values');
for (let i = arr7.length - 1; i >= 0; i--) {
  if (input === arr7[i] && index[arr7.length - 1 - i] != input) {
    index.push(i);
    console.log('The given number is present in ', index);
    break;
  } else {
    if (arr7[i] < input) {
      index.push(i);
      input = input - arr7[i];
    }
  }
}

// 15

const num1 = 20;
let var1 = 0;
let var2 = 1;

for (let i = 0; i < num1 - 2; i++) {
  let total3 = var1 + var2;
  if (i == 0) console.log(var1);
  else console.log(var1);
  var1 = var2;
  var2 = total3;
}
// console.log(arr8);

// 16
