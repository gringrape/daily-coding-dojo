function solution(string) {
  const numbers = string.split(' ').map((n) => parseInt(n, 10));

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return `${min} ${max}`;
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

test('simple', () => {
  expect(solution('1 2')).toBe('1 2');
  expect(solution('3 2')).toBe('2 3');
});
