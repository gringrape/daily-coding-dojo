test('test works', () => {
  expect(1 + 1).toBe(2);
});

function ways(board) {
  const N = board.length;
  const result = [];

  function go(i, j, visit = [], path = []) {
    if (i === N - 1 && j === N - 1) {
      result.push(path.join(''));
      return;
    }

    const boudaryIn = (x, y) => x >= 0 && x < N && y >= 0 && y < N;
    const visitSet = new Set(visit);
    const visited = (x, y) => visitSet.has(`${x}-${y}`);

    [
      [i + 1, j, 'D'],
      [i, j + 1, 'R'],
      [i - 1, j, 'U'],
      [i, j - 1, 'L'],
    ].forEach(([x, y, d]) => {
      if (boudaryIn(x, y) && board[x][y] !== 1 && !visited(x, y)) {
        go(x, y, [...visit, `${i}-${j}`], [...path, d]);
      }
    });
  }

  go(0, 0);

  return result;
}

test('possibleWays', () => {
  expect(ways([
    [0, 0],
    [0, 0],
  ]).length).toBe(2);

  expect(ways([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]).length).toBe(12);
});

function solution(board) {
  const paths = ways(board);
  const prices = paths.map((path) => [...path].reduce((price, d, i) => {
    if (path[i - 1] && path[i - 1] !== d) {
      return price + 600;
    }

    return price + 100;
  }, 0));

  return Math.min(...prices);
}

test('samples', () => {
  expect(solution([[0, 0, 0], [0, 0, 0], [0, 0, 0]])).toBe(900);
  expect(solution([[0, 0, 1, 0], [0, 0, 0, 0], [0, 1, 0, 1], [1, 0, 0, 0]])).toBe(2100);
  expect(solution([
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ])).toBe(3200);
});
