function initializeDistance(n) {
  return [
    0,
    ...Array(n - 1).fill(Number.MAX_SAFE_INTEGER),
  ];
}

function solution() {
  const times = [
    [1, 0], [2, 1], [3, 4], [4, 2], [5, 3],
  ];

  return times
    .filter(([, time]) => time <= 3)
    .map(([no]) => no)
    .length;
}

test('initialize distances', () => {
  expect(initializeDistance(5)).toEqual([
    0,
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  ]);
});

test('example', () => {
  expect(solution(5, [
    [1, 2, 1],
    [2, 3, 3],
    [5, 2, 2],
    [1, 4, 2],
    [5, 3, 1],
    [5, 4, 2],
  ], 3)).toBe(4);
});
