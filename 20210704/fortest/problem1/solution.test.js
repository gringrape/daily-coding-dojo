function solution(k, rates) {
  const initialPoint = rates.findIndex((rate, i) => (
    rate >= k && rates[i + 1] >= rates[i]
  ));

  const sliced = rates.slice(initialPoint);

  const points = Array(sliced.length).fill()
    .map((_, i) => i)
    .map((i) => {
      if (i === 0 && sliced[1] >= sliced[0]) {
        return ['-', sliced[0]];
      }
      if (sliced[i - 1] <= sliced[i] && sliced[i] >= sliced[i + 1]) {
        return ['+', sliced[i]];
      }
      if (sliced[i - 1] >= sliced[i] && sliced[i] <= sliced[i + 1]) {
        return ['-', sliced[i]];
      }
      if (i === sliced.length - 1 && sliced[i] >= sliced[i - 1]) {
        return ['+', sliced[i]];
      }
      return null;
    })
    .filter((i) => i);

  return points.reduce((acc, [sign, value]) => ({
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
  }[sign](acc, value)), k);
}

test('test works', () => {
  expect(1 + 1).toBe(2);
});

test('simple', () => {
  expect(solution(
    1000,
    [1000, 1500],
  )).toBe(1500);
});

test('sample', () => {
  expect(solution(1000, [1200, 1000, 1100, 1200, 900, 1000, 1500, 900, 750, 1100])).toBe(2150);
  expect(solution(1500, [1500, 1400, 1300, 1200])).toBe(1500);
});
