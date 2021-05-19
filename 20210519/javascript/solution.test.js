function countDivisors(number) {
  return Array(number).fill()
    .filter((_, i) => number % (i + 1) === 0)
    .length;
}

test('countDivisors', () => {
  expect(countDivisors(1)).toBe(1);
  expect(countDivisors(2)).toBe(2);
  expect(countDivisors(3)).toBe(2);
});

function solution(left, right, accumulator = 0) {
  if (left > right) {
    return accumulator;
  }

  const increment = ((-1) ** countDivisors(left)) * left;

  return solution(
    left + 1,
    right,
    accumulator + increment,
  );
}

test('test environment has no problem', () => {
  expect(1 + 1).toBe(2);
});

test('solution function exists', () => {
  expect(solution(1, 3));
});

test('simple', () => {
  expect(solution(1, 1)).toBe(-1);
  expect(solution(1, 2)).toBe(1);
  expect(solution(1, 3)).toBe(4);
});
