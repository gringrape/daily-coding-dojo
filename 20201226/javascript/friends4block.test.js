const makeBoard = (arr) => arr.map((str) => [...str]);

function findTwoByTwo(
  arr, i = 0, j = 0, answers = [], board = makeBoard(arr),
) {
  const getNext = () => ((j === board[0].length - 2)
    ? [i + 1, 0]
    : [i, j + 1]);

  const isSameBlock = (firstI, firstJ, secondI, secondJ) => (
    board[firstI][firstJ] === board[secondI][secondJ]
  );

  if (i === board.length - 1) {
    return answers;
  }

  const [nextI, nextJ] = getNext();

  if (
    isSameBlock(i, j, i + 1, j)
    && isSameBlock(i, j, i, j + 1)
    && isSameBlock(i, j, i + 1, j + 1)
  ) {
    return findTwoByTwo(arr, nextI, nextJ, [...answers, [i, j]], board);
  }

  return findTwoByTwo(arr, nextI, nextJ, answers, board);
}

test('findTwoByTwo', () => {
  expect(findTwoByTwo([
    'CC',
    'CC',
  ])).toEqual([
    [0, 0],
  ]);

  expect(findTwoByTwo([
    'CCBDE',
    'AAADE',
    'AAABF',
    'CCBBF',
  ])).toEqual([
    [1, 0],
    [1, 1],
  ]);

  expect(findTwoByTwo([
    'TTTANT',
    'RRFACC',
    'RRRFCC',
    'TRRRAA',
    'TTMMMF',
    'TMMTTJ',
  ])).toEqual([
    [1, 0],
    [1, 4],
    [2, 1],
  ]);
});

function deleteSquareAt(r, c, board) {
  return board.map((row, i) => row.map((val, j) => ((
    (i === r && j === c)
    || (i === r + 1 && j === c)
    || (i === r && j === c + 1)
    || (i === r + 1 && j === c + 1)
  ) ? 0 : val)));
}

test('deleteSquare', () => {
  expect(deleteSquareAt(0, 0, [
    ['A', 'A', 'B'],
    ['A', 'A', 'C'],
    ['D', 'B', 'A'],
  ])).toEqual([
    [0, 0, 'B'],
    [0, 0, 'C'],
    ['D', 'B', 'A'],
  ]);

  expect(deleteSquareAt(0, 1, [
    ['A', 'A', 'B'],
    ['A', 'A', 'C'],
    ['D', 'B', 'A'],
  ])).toEqual([
    ['A', 0, 0],
    ['A', 0, 0],
    ['D', 'B', 'A'],
  ]);
});

function pushAsideZeros(arr) {
  return arr
    .map((el, idx) => [idx, el])
    .sort(([i, el1], [j, el2]) => {
      if (el1 !== 0 && el2 === 0) {
        return 1;
      }
      if (el1 !== 0 && el2 !== 0) {
        return i - j;
      }
      return -1;
    })
    .map((entry) => entry[1]);
}

test('pushAsideZeros', () => {
  expect(pushAsideZeros(['A', 0, 0, 'B', 'C'])).toEqual([0, 0, 'A', 'B', 'C']);
  expect(pushAsideZeros(['X', 'C', 0, 0, 'B', 0, 'C'])).toEqual([0, 0, 0, 'X', 'C', 'B', 'C']);
});

function pulldown(board, columnIndex = 0) {
  if (columnIndex === board.length) {
    return board;
  }

  const currentColumn = board.map((row) => row[columnIndex]);
  const pulledColumn = pushAsideZeros(currentColumn);

  const pulledBoard = board
    .map((row, i) => row
      .map((el, j) => ((j === columnIndex) ? pulledColumn[i] : el)));

  return pulldown(pulledBoard, columnIndex + 1);
}

test('pulldown', () => {
  expect(pulldown(
    [
      ['A', 'A', 'A'],
      ['A', 0, 0],
      ['D', 'B', 'A'],
    ],

  )).toEqual([
    ['A', 0, 0],
    ['A', 'A', 'A'],
    ['D', 'B', 'A'],
  ]);
});
