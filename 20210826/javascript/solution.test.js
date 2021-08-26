function binarySearch(low, high, condition) {
  const mid = Math.floor((low + high) / 2);

  if (low > high) {
    return low;
  }

  return condition(mid)
    ? binarySearch(low, mid - 1, condition)
    : binarySearch(mid + 1, high, condition);
}

function solution(n, times) {
  function completable(time) {
    const sumOfPeople = times
      .map((t) => Math.floor(time / t))
      .reduce((a, c) => a + c, 0);

    return n <= sumOfPeople;
  }

  return binarySearch(0, 10 ** 18, completable);
}

test('binarySearch', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(binarySearch(
    0, 9,
    (i) => array[i] > 3,
  )).toBe(3);

  expect(binarySearch(
    0, 9,
    (i) => array[i] > 6,
  )).toBe(6);
});

test('sample', () => {
  expect(solution(6, [7, 10])).toBe(28);
});
