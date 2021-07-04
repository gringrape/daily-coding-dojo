test('test works', () => {
  expect(1 + 1).toBe(2);
});

function countLines(board, points) {
  const copied = JSON.parse(JSON.stringify(board));

  points.forEach(([i, j]) => {
    copied[i][j] = 1;
  });

  return copied
    .filter((row) => row.every((value) => value === 1))
    .length;
}

function solution(block, board) {
  const N = board.length;

  const blockPoints = (i, j) => ({
    0: [[i, j], [i + 1, j], [i + 2, j]],
    1: [[i, j], [i, j + 1], [i, j + 2]],
    2: [[i, j], [i + 1, j], [i + 1, j + 1]],
    3: [[i, j], [i + 1, j], [i + 1, j - 1]],
    4: [[i, j], [i, j + 1], [i + 1, j + 1]],
    5: [[i, j], [i, j + 1], [i + 1, j]],
  }[block]);

  const results = [];

  const inBoundary = (x, y) => x >= 0 && x < N && y >= 0 && y < N;
  const canBePut = (x, y) => inBoundary(x, y) && board[x][y] === 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const points = blockPoints(i, j);

      if (points.every(([x, y]) => canBePut(x, y))) {
        results.push(countLines(board, points));
      }
    }
  }

  if (!results.length) {
    return 0;
  }

  return Math.max(...results);
}

() => {
  test('samples', () => {
    expect(solution(
      0,
      [[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]],
    )).toBe(2);
    expect(solution(
      1,
      [[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]],
    )).toBe(1);
    expect(solution(
      2,
      [[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]],
    )).toBe(1);
    expect(solution(
      3,
      [[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]],
    )).toBe(1);
    expect(solution(
      4,
      [[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]],
    )).toBe(2);
    expect(solution(
      5,
      [[1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]],
    )).toBe(0);
  });
};
