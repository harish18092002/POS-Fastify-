import { errorCodes } from 'fastify';

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
  //  Splitting a string without using split inbuild function
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
// 13 checking whether the single word is a palindrome or not
const str = 'maam';
let m = 0;
let count1 = 0;
let n = str.length - 1;
while (m < n) {
  console.log({ m, n });
  if (str[m] !== str[n]) {
    console.log('Not a palindrom');
    break;
  }
  m++;
  n--;
  if (m >= n) {
    count1++;
    console.log('Palindrom');
  }
}

//13 a
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

const num1 = 12;
let var1 = 0;
let var2 = 1;

for (let i = 0; i < num1 - 2; i++) {
  let total3 = var1 + var2;
  if (i == 0) console.log(var1);
  else console.log(var1);
  var1 = var2;
  var2 = total3;
}

// 16
const matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
];
const matrix2 = [
  [1, 2, 3],
  [4, 5, 6],
];

let newMatrix = [];
let sum = 0;
let min = Infinity;
let max = 0;
if (matrix1.length != matrix2.length)
  console.log('Both matrix are not in same length so addition cannot be done');
else {
  for (let i = 0; i < matrix1.length; i++) {
    let addm = 0;
    let matrixArr = [];
    let valuesM1 = matrix1[i];
    let valuesM2 = matrix2[i];

    if (valuesM1.length != valuesM2.length) {
      console.log(
        'Both matrix are not in same length so addition cannot be done'
      );
      break;
    } else {
      for (let j = 0; j < valuesM1.length; j++) {
        addm = valuesM1[j] + valuesM2[j];
        if (addm < min) min = addm;
        if (addm > max) max = addm;
        matrixArr.push(addm);
      }
    }
    sum = max - min;
    newMatrix.push(matrixArr);
  }

  console.log('This is the added matrix', newMatrix);
  console.log(
    'This is the total of the max value - min value from new matrix',
    sum
  );
}

// 17
// Multiplication
const matrix3 = [
  [1, 2, 3],
  [4, 5, 4],
  [4, 5, 5],
];
const matrix4 = [
  [4, 5, 6],
  [1, 2, 7],
  [1, 2, 7],
];
let result = [];
if (matrix3[0].length != matrix4.length)
  console.log('Matrix cannot be multiplied');
else {
  for (let i = 0; i < matrix3.length; i++) {
    let matrixArr = [];
    for (let j = 0; j < matrix4[0].length; j++) {
      let addm = 0;
      for (let k = 0; k < matrix4.length; k++) {
        addm += matrix3[i][k] * matrix4[k][j];
      }
      matrixArr.push(addm);
    }
    result.push(matrixArr);
  }
}
console.log(result);

// Subtraction

const matrix5 = [
  [1, 2, 3],
  [4, 5, 4],
  [4, 5, 5],
];
const matrix6 = [
  [4, 5, 7],
  [1, 2, 4],
  [1, 2, 2],
];

let newMatrix1 = [];

if (matrix5.length != matrix6.length) {
  console.log(
    'Both matrix are not in same length so subtraction cannot be done'
  );
} else {
  for (let i = 0; i < matrix5.length; i++) {
    let addm = 0;
    let matrixArr = [];
    let valuesM1 = matrix5[i];
    let valuesM2 = matrix6[i];

    if (valuesM1.length != valuesM2.length) {
      console.log(
        'Both matrix are not in same length so subtraction cannot be done'
      );
      break;
    } else {
      for (let j = 0; j < valuesM1.length; j++) {
        addm = valuesM1[j] - valuesM2[j];
        matrixArr.push(addm);
      }

      newMatrix1.push(matrixArr);
    }
  }
  console.log('This is the subtracted matrix', newMatrix1);
}

// Pattern
const pattern = '*';
for (let i = 5; i >= 1; i--) {
  let newline = '';
  for (let j = 1; j <= i; j++) {
    newline = newline + pattern;
  }
  console.log(newline);
}

// Stone paper scissor problem

let p1 = 'sc';
let p2 = 'sc';
if (
  (p1 === 'st' && p2 === 'sc') ||
  (p1 === 'sc' && p2 === 'pa') ||
  (p1 === 'pa' && p2 === 'st')
)
  console.log('P1 wins');
else if (p1 === p2) console.log('Draw');
else console.log('P2 wins');

//Problems

const arr0 = [1, 4, 3, 2, 8];
const even = [];
const odd = [];

for (let i = 0; i < arr0.length; i++) {
  if (arr0[i] % 2 === 0) even.push(arr0[i]);
  else odd.push(arr0[i]);
}
if (even.length > odd.length) console.log('Even number are more in arr');
else if (even.length === odd.length)
  console.log('Odd and even numbers in array are equal');
else console.log('Odd numbers  are more in array');
console.log({ odd, even });

// Problems 2
// Trolls are attacking your comment section!

// A common way to deal with this situation is to remove all of the vowels from the trolls' comments, neutralizing the threat.
// Your task is to write a function that takes a string and return a new string with all vowels removed.
// For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".
// Note: for this kata y isn't considered a vowel.

const str0 = 'This website is for losers LOL!';
const splits = [];
splits.push(str0.replace(/[aeiou]/gi, ''));
console.log(splits.join(''));

// Problem 3

// In a factory a printer prints labels for boxes. For one kind of boxes the printer
// has to use colors which, for the sake of simplicity, are named with letters from
// a to m.

// The colors used by the printer are recorded in a control string.
//  For example a "good" control string would be aaabbbbhaijjjm meaning that the
// printer used three times color a, four times color b, one time color h then one
// time color a...

// Sometimes there are problems: lack of colors, technical malfunction and a "bad"
// control string is produced e.g. aaaxbbbbyyhwawiwjjjwwm with letters not from a to
//  m.

// You have to write a function printer_error which given a string will
// return the error rate of the printer as a string representing a rational whose
// numerator is the number of errors and the denominator the length of the control
// string. Don't reduce this fraction to a simpler expression.

// The string has a length greater or equal to one and contains only letters from
// ato z.

// Examples:
// s="aaabbbbhaijjjm"
// printer_error(s) => "0/14"

// s="aaaxbbbbyyhwawiwjjjwwm"
// printer_error(s) => "8/22"

const printerCode = 'aaaxbbbbyyhwawiwjjjwwm';
const validCode = 'abcdefghijklm';
let error = 0;
for (let i = 0; i < printerCode.length; i++) {
  for (let j = 0; j < validCode.length; j++) {
    if (printerCode[i] === validCode[j]) {
      break;
    } else {
      if (j === validCode.length - 1) error++;
    }
  }
}
console.log('Printer Error = ', error, '/', printerCode.length);

// Problem 4

// You get an array of numbers, return the sum of all of the positives ones.

// Example [1,-4,7,12] => 1 + 7 + 12 = 20

// Note: if there is nothing to sum, the sum is default to 0.

const inp = [1, -4, 7, 12];
let sums = 0;
for (let i = 0; i < inp.length; i++) {
  if (inp[i] > 0) sums += inp[i];
}
console.log(sums);

// Problem 5
// Return the number (count) of vowels in the given string.

// We will consider a, e, i, o, u as vowels for this Kata (but not y).

// The input string will only consist of lower case letters and/or spaces.

const input4 = 'abcdefghijklmnopqrstuvwxyz';
const vowels = 'aeiou';
let count2 = 0;
for (let i = 0; i < input4.length; i++) {
  for (let j = 0; j < vowels.length; j++) {
    if (input4[i] === vowels[j]) count2++;
  }
}
console.log(count2);

// Problem 6
// You are going to be given a word. Your job is to return the middle
//  character of the word. If the word's length is odd, return the middle character.
//  If the word's length is even, return the middle 2 characters.

// #Examples:

// Kata.getMiddle("test") should return "es"

// Kata.getMiddle("testing") should return "t"

// Kata.getMiddle("middle") should return "dd"

// Kata.getMiddle("A") should return "A"
// #Input

// A word (string) of length 0 < str < 1000 (In javascript you may get slightly
// more than 1000 in some test cases due to an error in the test cases). You do not
// need to test for this. This is only here to tell you that you do not need to
// worry about your solution timing out.

// #Output

// The middle character(s) of the word represented as a string.
const input5 = 'Abce';
if (input5.length % 2 === 0) {
  const i = input5.length / 2;
  console.log(input5.slice(i - 1, i + 1));
} else if (input5.length === 1) console.log(input5);
else {
  const j = Math.floor(input5.length / 2);
  console.log(input5.slice(j, j + 1));
}
// Problem 7

// Given a list of integers, determine whether the sum of its elements is odd
//  or even.

// Give your answer as a string matching "odd" or "even".

// If the input array is empty consider it as: [0] (array with a zero).

// Examples:
// Input: [0]
// Output: "even"

// Input: [0, 1, 4]
// Output: "odd"

// Input: [0, -1, -5]
// Output: "even"
// Have fun!

const arr = [0, -1, 5];
const total6 = arr.reduce((cur, prev) => cur + prev, 0);
if (total6 % 2 === 0) console.log('even');
else console.log('odd');

// Problem 8

// Nathan loves cycling.

// Because Nathan knows it is important to stay hydrated, he drinks 0.5
// litres of water per hour of cycling.

// You get given the time in hours and you need to return the number of litres
//  Nathan will drink, rounded to the smallest value.

// For example:

// time = 3 ----> litres = 1

// time = 6.7---> litres = 3

// time = 11.8--> litres = 5

export function litres(time: number): number {
  let lit = 0;
  for (let i = 1; i <= time; i++) lit += 0.5;
  return Math.floor(lit);
}
const time = 11.8;
let lit = 0;
for (let i = 1; i <= time; i++) lit += 0.5;
console.log(Math.floor(lit));
console.log(Math.round(Math.pow(0.5, time)));
