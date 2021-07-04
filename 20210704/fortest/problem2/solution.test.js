/* eslint-disable no-continue */
/* eslint-disable no-const-assign */
test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(money, cost) {
  let start = 0;
  let end = 0;

  let currentMoney = cost[0];

  const results = [];

  while (end < cost.length) {
    if (start > end) {
      end += 1;
      if (start === end) {
        currentMoney += cost[end];
      }
      continue;
    }

    if (currentMoney > money) {
      currentMoney -= cost[start];
      start += 1;
      continue;
    }

    if (currentMoney <= money) {
      results.push([start, end]);
      end += 1;
      currentMoney += cost[end];
    }
  }

  if (results.length === 0) {
    return 0;
  }

  return Math.max(...results
    .map(([s, e]) => e - s + 1));
}

test('sample', () => {
  expect(solution(
    420,
    [0, 900, 0, 200, 150, 0, 30, 50],
  )).toBe(5);
  expect(solution(
    100,
    [245, 317, 151, 192],
  )).toBe(0);
});
