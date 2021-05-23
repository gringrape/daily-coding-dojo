function primesOf(n) {
  return Array(n).fill()
    .map((_, i) => i + 1)
    .filter((i) => n % i === 0);
}

test('primesOf', () => {
  expect(primesOf(6)).toEqual([1, 2, 3, 6]);
});

function solution(n) {
  return primesOf(n * 2)
    .filter((i) => {
      if (i % 2 === 0 && Number.isInteger(n / i)) {
        return false;
      }

      return 2 * n > (i - 1) * i;
    })
    .length;
}

test('simple', () => {
  expect(solution(1)).toBe(1);
  expect(solution(3)).toBe(2);
  expect(solution(15)).toBe(4);
});

test('fail', () => {
  expect(solution(12)).toBe(2);
});
