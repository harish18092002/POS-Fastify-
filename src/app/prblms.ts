// Problems
export function problems() {
  // // Problem 1
  // const str = 'I am a intern in Surfboard payments';
  // for (let i = 1; i <= 7; i++) {
  //   // console.log(str);
  // }

  // // // Problem 2
  // for (let i = 1; i <= 100; i++) {
  //   // console.log(i);
  // }

  // // // Problem 3
  // for (let i = 1; i <= 100; i++) {
  //   // if (i % 2 == 0) console.log('Even : ', i);
  //   // else console.log('Odd : ', i);
  // }

  // // // Problem 4
  // const inputNumber = 45;
  // for (let i = inputNumber; i <= 100 + inputNumber; i++) {
  //   // console.log(i);
  // }

  // // // Problem 5
  // let sum = 0;
  // for (let i = 1; i <= 100; i++) {
  //   sum = i + sum;
  // }
  // // console.log(sum);

  // // // Problem 6
  // const words = 'abcdefghijklmnopqrstuvwxyz';
  // const alphabets = words.split(',').forEach((letters) => {
  //   console.log(letters);
  // });

  // // // Problem 7
  // const userInput = 20;
  // for (let i = userInput; i <= 100 + userInput; i++) {
  //   if (i % 2 === 0) console.log('Even : ', i);
  //   else console.log('Odd : ', i);
  // }

  // // // Problem 8
  // const arr = [1, 2, 3, 4, 5];
  // let add = arr.reduce((acc, red) => acc + red, 0);
  // console.log(add);

  // // // Problem 9

  // const userValue = 45;
  // let sum1 = 0;
  // for (let i = userValue + 1; i <= 50 + userValue; i++) {
  //   sum1 = sum1 + i;
  // }
  // console.log(sum1);

  // // Problem 10
  const pattern = 8;
  for (let i = 1; i <= 5; i++) {
    let line = '';
    for (let j = 1; j <= i; j++) {
      line = line + pattern;
    }
    console.log(line);
  }

  // // // Problem 11
  // const num = '12345';
  // let sum2 = 0;
  // let i = 0;
  // while (i < num.length) {
  //   sum2 = parseInt(num[i]) + sum2;
  //   i++;
  // }
  // console.log('This is sum of the given num ' + sum2);

  // // // Problem 12

  // const alphabets2 = 'abcdefghijklmnopqrstuvwxyz';
  // let j = 0;
  // while (j < alphabets2.length) {
  //   const letters = alphabets2[j];
  //   // console.log(letters);
  //   j++;
  // }

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

  // let k = 0;
  // let sum = 0;
  // const arr1 = [];
  // while (k < sumOfarr.length) {
  //   sum += parseInt(sumOfarr[k]);
  //   k++;
  // }
  // console.log('This is arr1', sum.toString()[1]);
  // for (let i = 0; i < sum.toString().length; i++) {
  //   if (sum.toString().length > 1) {
  //     arr1.push(parseInt(sum.toString()[i]));
  //   }
  // }
  // const total = arr1.reduce((acc, red) => acc + red, 0);
  // console.log('This is sum of the array', total);

  // Problem 14

  for (let i = 100; i <= 500; i++) {
    const str = i.toString();
    let l = 0;
    const sum3 = [];
    while (l < str.length) {
      sum3.push(Math.pow(parseInt(str[l]), 3));
      l++;
    }
    if (sum3.reduce((acc, red) => acc + red, 0) === i) {
      console.log('These are the amstrong numbers:- ', i);
    }
  }
  console.log();

  // Problem 15

  const arr2 = [9];
  const input = 5;
  let i = 0;
  while (i < input - 1) {
    console.log(i);
    arr2.push(arr2[i] * 10 + 9);
    i++;
  }
  const total = arr2.reduce((prev, cur) => prev + cur, 0);
  console.log('This is the total of the problem 15', total);

  // Problem 16

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
}
