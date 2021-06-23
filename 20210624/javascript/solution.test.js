test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(n, s) {
  if (s < n) {
    return [-1];
  }

  const remainder = s % n;
  const quotient = (s - remainder) / n;

  return [
    ...Array(n - remainder).fill(quotient),
    ...Array(remainder).fill(quotient + 1),
  ];
}

test('solution', () => {
  expect(solution(2, 8)).toEqual([4, 4]);
  expect(solution(2, 9)).toEqual([4, 5]);
  expect(solution(2, 1)).toEqual([-1]);
});
