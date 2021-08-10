function solution(maps) {
  const M = maps.length;
  const N = maps[0].length;

  const record = JSON.parse(JSON.stringify(maps));

  const start = [0, 0];
  const Q = [];
  Q.push([1, start]);
  record[0][0] = 2;

  while (Q.length > 0) {
    const [count, [x, y]] = Q.shift();

    if (x === M - 1 && y === N - 1) {
      return count;
    }

    const inBoundary = (r, c) => r >= 0 && r < M && c >= 0 && c < N;
    const notWall = (r, c) => maps[r][c] !== 0;
    const notVisited = (r, c) => record[r][c] !== 2;

    const neighbors = [
      [x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y],
    ];

    neighbors.forEach(([r, c]) => {
      if (inBoundary(r, c) && notWall(r, c) && notVisited(r, c)) {
        record[r][c] = 2;
        Q.push([count + 1, [r, c]]);
      }
    });
  }

  return -1;
}

test('simple', () => {
  expect(solution([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ])).toBe(5);
});

test('not reachable', () => {
  expect(solution([
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
  ])).toBe(-1);
});

test('sample', () => {
  expect(solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])).toBe(11);

  expect(solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])).toBe(-1);
});
