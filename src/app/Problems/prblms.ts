// import { sep } from 'path';

// // Problems
export function problems() {
  // Problem 1
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
