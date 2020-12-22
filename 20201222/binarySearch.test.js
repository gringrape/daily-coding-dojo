function binarySearch(arr, num, high = arr.length - 1, low = 0) {
  if (low > high) {
    return -1;
  }

  const guess = Math.floor((high + low) / 2);

  if (arr[guess] === num) {
    return guess;
  }

  return (arr[guess] > num)
    ? binarySearch(arr, num, guess - 1, low)
    : binarySearch(arr, num, high, guess + 1);
}

test('binarySearch', () => {
  expect(binarySearch([1], 1)).toBe(0);
  expect(binarySearch([1, 2, 3], 2)).toBe(1);
  expect(binarySearch([1, 2, 3, 4], 2)).toBe(1);
  expect(binarySearch([1, 2, 3, 4], 3)).toBe(2);
  expect(binarySearch([3, 7, 8, 9, 22, 54], 22)).toBe(4);
  expect(binarySearch([3, 7, 8, 9, 22, 54], 10)).toBe(-1);
});

function binarySearchSmallerThan(arr, num, high = arr.length, low = -1) {
  if (low + 1 === high) {
    return low;
  }

  const guess = Math.floor((high + low) / 2);

  return (arr[guess] <= num)
    ? binarySearchSmallerThan(arr, num, high, guess)
    : binarySearchSmallerThan(arr, num, guess, low);
}

test('binarySearchSmallerThan', () => {
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8], 5)).toBe(3);
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8, 15], 10)).toBe(4);
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8, 15], 20)).toBe(5);
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8, 15], 0)).toBe(-1);
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8, 15], 3.5)).toBe(2);
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8, 15], 1.5)).toBe(0);
  expect(binarySearchSmallerThan([1, 2, 3, 4, 8, 15], 2.5)).toBe(1);
});
