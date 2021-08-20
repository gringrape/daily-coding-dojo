function solution(n, s, a, b, fares) {
  const INFINITY = 1000000000;

  const table = [...Array(n)].map(
    () => [...Array(n)].map(() => INFINITY),
  );

  fares.forEach(([u, v, fare]) => {
    table[u - 1][v - 1] = fare;
    table[v - 1][u - 1] = fare;
  });

  for (let k = 0; k < n; k += 1) {
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        table[i][j] = Math.min(
          table[i][j],
          table[i][k] + table[k][j],
        );
      }
    }
  }

  for (let i = 0; i < n; i += 1) {
    table[i][i] = 0;
  }

  return Math.min(
    ...[...Array(n)].map((_, i) => table[s - 1][i] + table[i][a - 1] + table[i][b - 1]),
  );
}

test('sample', () => {
  expect(solution(
    6, 4, 6, 2,
    [
      [4, 1, 10],
      [3, 5, 24],
      [5, 6, 2],
      [3, 1, 41],
      [5, 1, 24],
      [4, 6, 50],
      [2, 4, 66],
      [2, 3, 22],
      [1, 6, 25],
    ],
  )).toBe(82);

  expect(solution(
    7, 3, 4, 1,
    [
      [5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6],
    ],
  )).toBe(14);
});
