test('test works', () => {
  expect(1 + 1).toBe(2);
});

function factorial(n) {
  if (n <= 1) {
    return 1;
  }

  return Array(n).fill().map((_, i) => i + 1)
    .reduce((result, i) => result * i, 1);
}

test('factorial', () => {
  expect(factorial(1)).toBe(1);
  expect(factorial(2)).toBe(2);
  expect(factorial(3)).toBe(6);
  expect(factorial(5)).toBe(120);
});

function solution(n, k) {
  const reducer = ({ K, remains, numbers }, N) => {
    const fact = factorial(N - 1);
    const index = Math.floor((K - 1) / fact);
    const picked = remains[index];

    remains.splice(index, 1);

    return {
      K: K - index * fact,
      remains,
      numbers: [...numbers, picked],
    };
  };

  const { numbers } = Array(n).fill().map((_, i) => n - i)
    .reduce(reducer, {
      K: k,
      remains: Array(n).fill().map((_, i) => i + 1),
      numbers: [],
    });

  return numbers;
}

test('samples', () => {
  expect(solution(3, 5)).toEqual([3, 1, 2]);
  expect(solution(4, 5)).toEqual([1, 4, 2, 3]);
});
