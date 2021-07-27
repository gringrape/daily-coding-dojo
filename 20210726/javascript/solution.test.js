function search(board) {
  const m = board.length;
  const n = board[0].length;

  const blocks = (i, j) => [
    [i, j],
    [i + 1, j],
    [i, j + 1],
    [i + 1, j + 1],
  ];

  const isArea = (i, j) => blocks(i, j)
    .every(([r, c]) => board[r][c] && board[r][c] === board[i][j]);

  const points = [];

  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (isArea(i, j)) {
        blocks(i, j).forEach((block) => {
          points.push(block);
        });
      }
    }
  }

  return points;
}

function remove(board) {
  search(board).forEach(([i, j]) => {
    board[i][j] = null;
  });

  return board;
}

test('remove', () => {
  expect(remove([
    ['C', 'C', 'B', 'D', 'E'],
    ['A', 'A', 'A', 'D', 'E'],
    ['A', 'A', 'A', 'B', 'F'],
    ['C', 'C', 'B', 'B', 'F'],
  ])).toEqual([
    ['C', 'C', 'B', 'D', 'E'],
    [null, null, null, 'D', 'E'],
    [null, null, null, 'B', 'F'],
    ['C', 'C', 'B', 'B', 'F'],
  ]);
});

function squeeze(column) {
  const blocks = column.filter((x) => x);
  const blanks = Array(column.length - blocks.length).fill(null);
  return [...blanks, ...blocks];
}

test('squeeze', () => {
  expect(squeeze(['C', null, null, 'C'])).toEqual([null, null, 'C', 'C']);
});

function transpose(array) {
  return [...Array(array[0].length)]
    .map((_, i) => array.map((row) => row[i]));
}

function fall(board) {
  const columns = transpose(board);

  const falledColumns = columns.map(squeeze);

  return transpose(falledColumns);
}

test('fall', () => {
  expect(fall([
    ['C', 'C', 'B', 'D', 'E'],
    [null, null, null, 'D', 'E'],
    [null, null, null, 'B', 'F'],
    ['C', 'C', 'B', 'B', 'F'],
  ])).toEqual([
    [null, null, null, 'D', 'E'],
    [null, null, null, 'D', 'E'],
    ['C', 'C', 'B', 'B', 'F'],
    ['C', 'C', 'B', 'B', 'F'],
  ]);
});

function chain(board, count = 0) {
  const points = search(board);
  const removedCount = new Set(points.map(([i, j]) => `${i}-${j}`)).size;

  if (removedCount === 0) {
    return count;
  }

  remove(board);

  return chain(fall(board), count + removedCount);
}

test('sample', () => {
  expect(chain([
    ['C', 'C', 'B', 'D', 'E'],
    ['A', 'A', 'A', 'D', 'E'],
    ['A', 'A', 'A', 'B', 'F'],
    ['C', 'C', 'B', 'B', 'F'],
  ], 0)).toBe(14);
});

function solution(m, n, board) {
  return chain(
    board.map((row) => [...row]),
  );
}

test('sample', () => {
  expect(solution(4, 5, [
    'CCBDE',
    'AAADE',
    'AAABF',
    'CCBBF',
  ])).toBe(14);
});
