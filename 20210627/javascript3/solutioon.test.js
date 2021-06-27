test('test works', () => {
  expect(1 + 1).toBe(2);
});

function combinations(nums, r) {
  const results = [];

  function go(numbers = nums, combination = []) {
    if (combination.length === r) {
      results.push(combination);
      return;
    }

    numbers.forEach((n, i) => {
      go(numbers.slice(i + 1), [...combination, n]);
    });
  }

  go();

  return results;
}

test('combinations', () => {
  expect(combinations([1, 2, 3, 4, 5], 3).length).toBe(10);
});

function range(from, to) {
  return Array(to - from + 1).fill()
    .map((_, i) => from + i);
}

function sum(array) {
  return array.reduce((a, c) => a + c);
}

function isPrime(n) {
  const sqrt = Math.floor(Math.sqrt(n));

  return range(2, sqrt)
    .every((k) => n % k !== 0);
}

test('isPrime', () => {
  expect(isPrime(2)).toBeTruthy();
  expect(isPrime(3)).toBeTruthy();
  expect(isPrime(4)).toBeFalsy();
});

function solution(nums) {
  return combinations(nums, 3)
    .map(sum)
    .filter(isPrime)
    .length;
}

test('samples', () => {
  expect(solution([1, 2, 3, 4])).toBe(1);
  expect(solution([1, 2, 7, 6, 4])).toBe(4);
});
