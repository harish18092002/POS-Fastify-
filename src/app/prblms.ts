// Problems
export function problems() {
  // // Problem 1
  // const str = 'I am a intern in Surfboard payments';
  // for (let i = 1; i <= 7; i++) {
  //   // console.log(str);
  // }

  // // Problem 2
  // for (let i = 1; i <= 100; i++) {
  //   // console.log(i);
  // }

  // // Problem 3
  // for (let i = 1; i <= 100; i++) {
  //   // if (i % 2 == 0) console.log('Even : ', i);
  //   // else console.log('Odd : ', i);
  // }

  // // Problem 4
  // const inputNumber = 45;
  // for (let i = inputNumber; i <= 100 + inputNumber; i++) {
  //   // console.log(i);
  // }

  // // Problem 5
  // let sum = 0;
  // for (let i = 1; i <= 100; i++) {
  //   sum = i + sum;
  // }
  // console.log(sum);

  // // Problem 6
  // const words = 'abcdefghijklmnopqrstuvwxyz';
  // const alphabets = words.split(',').forEach((letters) => {
  //   console.log(letters);
  // });

  // // Problem 7
  // const userInput = 20;
  // for (let i = userInput; i <= 100 + userInput; i++) {
  //   if (i % 2 === 0) console.log('Even : ', i);
  //   else console.log('Odd : ', i);
  // }

  // // Problem 8
  // const arr = [1, 2, 3, 4, 5];
  // let add = arr.reduce((acc, red) => acc + red, 0);
  // console.log(add);

  // // Problem 9

  // const userValue = 45;
  // let sum1 = 0;
  // for (let i = userValue + 1; i <= 50 + userValue; i++) {
  //   sum1 = sum1 + i;
  // }
  // console.log(sum1);

  // Problem 10
  const pattern = 8;
  for (let i = 1; i <= 5; i++) {
    let line = '';
    for (let j = 1; j <= i; j++) {
      line = line + pattern;
    }
    console.log(line);
  }

  // // Problem 11
  const num = '12345';
  let sum2 = 0;
  let i = 0;
  while (i < num.length) {
    sum2 = parseInt(num[i]) + sum2;
    i++;
  }
  // console.log('This is sum of the given num ' + sum2);

  // // Problem 12

  const alphabets2 = 'abcdefghijklmnopqrstuvwxyz';
  let j = 0;
  while (j < alphabets2.length) {
    const letters = alphabets2[j];
    // console.log(letters);
    j++;
  }

  // Problem 13

  const arr = [11, 12, 14];
  const sumOfarr = arr.reduce((acc, red) => acc + red, 0).toString();
  // console.log(sumOfarr);
  let k = 0;
  let sum = 0;
  while (k < sumOfarr.length) {
    sum += parseInt(sumOfarr[k]);
    k++;
  }
  console.log(sum);
}
