test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function solution(n, money) {
  let count = 0;
  const results = new Set();
  money.sort((a, b) => b - a);

  function pay(remain, changes, previous = Number.MAX_VALUE) {
    const key = `${remain}-${changes.toString()}`;
    if (remain === 0 || results.has(key)) {
      results.add(key);

      count %= 1_000_000_007;
      count += 1;
      return;
    }

    const newChanges = changes.filter((k) => k <= Math.min(previous, remain));

    newChanges.forEach((k) => {
      if (remain % k === 0) {
        pay(0, newChanges);
        return;
      }

      pay(
        remain - k,
        newChanges,
        k,
      );
    });
  }

  pay(n, money);

  return count;
}

test('solution', () => {
  expect(solution(5, [1, 2, 5])).toBe(4);
});
