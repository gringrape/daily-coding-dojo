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

function binarySearchNearest(arr, num, high = arr.length - 1, low = 0) {
  if (low + 1 === high) {
    return low;
  }

  const guess = Math.floor((high + low) / 2);

  return (arr[guess] <= num)
    ? binarySearchNearest(arr, num, high, guess)
    : binarySearchNearest(arr, num, guess - 1, low);
}

test('binarySearchNearest', () => {
  expect(binarySearchNearest([1, 2, 3, 4, 8], 5)).toBe(3);
  expect(binarySearchNearest([1, 2, 3, 4, 8, 15], 10)).toBe(4);
});
