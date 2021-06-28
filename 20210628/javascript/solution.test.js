function combinations(array, r, result = []) {
  if (r === 0) {
    return [result];
  }

  return array
    .flatMap((n, i) => combinations(array.slice(i + 1), r - 1, [n, ...result]));
}

function isPrime(n) {
  const rangeInclusive = (from, to) => Array(to - from + 1)
    .fill()
    .map((_, i) => from + i);

  return rangeInclusive(1, n)
    .filter((i) => n % i === 0)
    .length === 2;
}

function solution(nums) {
  const sum = (array) => array.reduce((a, c) => a + c, 0);

  return combinations(nums, 3)
    .map(sum)
    .filter(isPrime)
    .length;
}

test('combinations', () => {
  expect(combinations([1, 2, 3, 4, 5], 3).length).toBe(10);
  expect(combinations([1, 2, 3, 4, 5], 2).length).toBe(10);
  expect(combinations([1, 2, 3, 4, 5, 6], 3).length).toBe(20);
});

test('isPrime', () => {
  expect(isPrime(2)).toBeTruthy();
  expect(isPrime(7)).toBeTruthy();
  expect(isPrime(11)).toBeTruthy();

  expect(isPrime(20)).toBeFalsy();
  expect(isPrime(100)).toBeFalsy();
});

test('samples', () => {
  expect(solution([1, 2, 3, 4])).toBe(1);
});
