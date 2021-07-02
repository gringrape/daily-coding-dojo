test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(numbers) {
  if (Math.max(...numbers) === 0) {
    return '0';
  }

  return numbers
    .map((number) => number.toString())
    .sort((a, b) => (a + b > b + a ? -1 : 1))
    .join('');
}

test('0', () => {
  expect(solution([0, 0, 0])).toBe('0');
});

test('sample', () => {
  expect(solution([6, 10, 2])).toBe('6210');
  expect(solution([3, 30, 34, 5, 9])).toBe('9534330');
});
