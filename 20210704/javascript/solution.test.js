test('test works', () => {
  expect(1 + 1).toBe(2);
});

function calculate(path) {
  return [...path].reduce((cost, current, i) => {
    const previous = path[i - 1];
    if (previous && previous !== current) {
      return cost + 600;
    }
    return cost + 100;
  }, 0);
}

test('calculate cost', () => {
  expect(calculate('RR')).toBe(200);
  expect(calculate('RRL')).toBe(800);
  expect(calculate('RRDD')).toBe(900);
});

function solution(board) {
  const N = board.length;

  const Q = [];
  const cost = Array(N).fill()
    .map(() => Array(N).fill(Number.MAX_SAFE_INTEGER));

  const initial = [0, 0, ''];
  Q.push(initial);
  cost[0][0] = 0;

  const inBoundary = (x, y) => (
    x >= 0 && x < N && y >= 0 && y < N
  );

  const compareCost = (x, y, newCost) => (
    cost[x][y] >= newCost
  );

  while (Q.length > 0) {
    const [x, y, path] = Q.pop();

    const nears = [
      [x - 1, y, 'D'], [x, y - 1, 'U'], [x + 1, y, 'R'], [x, y + 1, 'L'],
    ];

    nears.forEach(([newX, newY, newD]) => {
      const newCost = calculate(path + newD);
      if (
        inBoundary(newX, newY)
        && board[newX][newY] !== 1
        && compareCost(newX, newY, newCost)
      ) {
        cost[newX][newY] = newCost;
        Q.push([newX, newY, path + newD]);
      }
    });
  }

  console.log(cost);

  return cost[N - 1][N - 1];
}

test('samples', () => {
  // expect(solution([
  //   [0, 0, 0],
  //   [0, 0, 0],
  //   [0, 0, 0],
  // ])).toBe(900);

  expect(solution([
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 0],
  ])).toBe(2100);
});
