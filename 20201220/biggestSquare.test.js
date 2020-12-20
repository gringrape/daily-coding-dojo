class CountBoard {
  constructor({ rowSize, colSize }) {
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.board = Array(rowSize)
      .fill()
      .map(() => Array(colSize).fill(0));
  }

  write(i, j, value) {
    this.board[i][j] = value;
  }

  read(i, j) {
    if (i < 0 || i >= this.rowSize || j < 0 || j >= this.colSize) {
      return 0;
    }

    return this.board[i][j];
  }
}

test('classBoard', () => {
  const countBoard = new CountBoard({ rowSize: 3, colSize: 3 });

  countBoard.write(1, 1, 3);
  expect(countBoard.read(1, 1)).toBe(3);
  expect(countBoard.read(2, 2)).toBe(0);
  expect(countBoard.read(-1, -2)).toBe(0);
});

function isSquare(startI, startJ, arr, size) {
  return arr
    .filter((_, r) => r >= startI && r <= startI + size)
    .flatMap((row) => row.filter((_, c) => c >= startJ && c <= startJ + size))
    .every((el) => el === 1);
}

function getMemoizedCount(i, j, countBoard) {
  return Math.min(
    countBoard.read(i - 1, j - 1), countBoard.read(i - 1, j), countBoard.read(i, j - 1),
  ) + 1;
}

function findBiggestSquareSizeAt(
  i, j, arr, countBoard, count = getMemoizedCount(i, j, countBoard),
) {
  if (i === 0 || j === 0) {
    return 0;
  }

  const memoizedCount = getMemoizedCount(i, j, countBoard);
  countBoard.write(i, j, memoizedCount);

  return memoizedCount;
}

describe('findBiggestSquareSizeAt', () => {
  const countBoard = new CountBoard({ rowSize: 50, colSize: 50 });
  test('run', () => {
    expect(findBiggestSquareSizeAt(0, 1, [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
    ], countBoard)).toBe(3);

    expect(findBiggestSquareSizeAt(0, 0, [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
    ], countBoard)).toBe(0);

    expect(findBiggestSquareSizeAt(1, 2, [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
    ], countBoard)).toBe(2);
  });
});

function solution(
  arr, countBoard = new CountBoard({ rowSize: arr.length, colSize: arr[0].length }),
) {
  const localBiggest = arr
    .flatMap((row, i) => row
      .map((_, j) => findBiggestSquareSizeAt(i, j, arr, countBoard)));

  const globalBiggest = Math.max(...localBiggest);

  return globalBiggest ** 2;
}

test('solution', () => {
  expect(solution([[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 1, 0]])).toBe(9);
  expect(solution([[0, 0, 1, 1], [1, 1, 1, 1]])).toBe(4);
});
