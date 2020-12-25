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
