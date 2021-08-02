function range(start, end) {
  return [...Array(end - start + 1)]
    .map((_, i) => i + start);
}

function solution(price, money, count) {
  const totalPrice = range(1, count)
    .reduce((a, i) => a + i * price, 0);

  return Math.max(totalPrice - money, 0);
}

test('not enough money', () => {
  expect(solution(3, 20, 4)).toBe(10);
});

test('enough money', () => {
  expect(solution(3, 20, 2)).toBe(0);
});
