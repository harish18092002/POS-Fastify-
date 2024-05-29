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
  console.log(arr1);

  // const swapping = swapFunciton([arr1[i], arr1[j]]);
  // ascend.push(swapping);
  //   swap function
  //   const a = [1, 2];
  //   const sw = swapFunciton(a);
  //   console.log(sw);
}
// function swapFunciton(a) {
//   //   console.log(a);
//   const first = a[0];
//   const sw = [(a[0] = a[1]), (a[1] = first)];
//   return sw;
// }
