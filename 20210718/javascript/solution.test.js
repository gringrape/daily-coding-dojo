function solution(n, money) {
  const dp = Array(n + 1).fill(0);

  dp[0] = 1;
  money.forEach((m) => {
    for (let j = m; j <= n; j++) {
      dp[j] += dp[j - m];
    }
  });

  return dp[n];
}

test('sample', () => {
  expect(solution(
    5,
    [1, 2, 5],
  )).toBe(4);
});
