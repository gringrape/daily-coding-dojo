function findTwoByTwo(
  board, i = 0, j = 0, answers = [],
) {
  const getNext = () => ((j === board[0].length - 2)
    ? [i + 1, 0]
    : [i, j + 1]);

  const isSameBlock = (firstI, firstJ, secondI, secondJ) => (
    board[firstI][firstJ] === board[secondI][secondJ]
  );

  const isNotZero = (firstI, firstJ) => board[firstI][firstJ] !== 0;

  if (i === board.length - 1) {
    return answers;
  }

  const [nextI, nextJ] = getNext();

  if (
    isNotZero(i, j)
    && isSameBlock(i, j, i + 1, j)
    && isSameBlock(i, j, i, j + 1)
    && isSameBlock(i, j, i + 1, j + 1)
  ) {
    return findTwoByTwo(board, nextI, nextJ, [...answers, [i, j]]);
  }

  return findTwoByTwo(board, nextI, nextJ, answers);
}

test('findTwoByTwo', () => {
  expect(findTwoByTwo([
    [0, 0, 'A'],
    [0, 0, 'A'],
    ['B', 'B', 'A'],
  ])).toEqual([]);

  expect(findTwoByTwo([
    ['C', 'C'],
    ['C', 'C'],
  ])).toEqual([
    [0, 0],
  ]);

  expect(findTwoByTwo([
    ['C', 'C', 'B', 'D', 'E'],
    ['A', 'A', 'A', 'D', 'E'],
    ['A', 'A', 'A', 'B', 'F'],
    ['C', 'C', 'B', 'B', 'F'],
  ])).toEqual([
    [1, 0],
    [1, 1],
  ]);

  expect(findTwoByTwo([
    ['T', 'T', 'T', 'A', 'N', 'T'],
    ['R', 'R', 'F', 'A', 'C', 'C'],
    ['R', 'R', 'R', 'F', 'C', 'C'],
    ['T', 'R', 'R', 'R', 'A', 'A'],
    ['T', 'T', 'M', 'M', 'M', 'F'],
    ['T', 'M', 'M', 'T', 'T', 'J'],
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

function solve(arr) {
  const founds = findTwoByTwo(arr);

  if (founds.length === 0) {
    return arr
      .flatMap((el) => el)
      .filter((el) => el === 0).length;
  }

  const deleted = founds
    .reduce((updated, [i, j]) => deleteSquareAt(i, j, updated), arr);

  const pulled = pulldown(deleted);

  return solve(pulled);
}

describe('solve', () => {
  it('returns the number of zeros of board', () => {
    expect(solve([
      ['A', 'A', 'A'],
      ['A', 0, 0],
      ['D', 'B', 'A'],
    ])).toBe(2);

    expect(solve([
      ['A', 'A', 'A'],
      [0, 0, 0],
      ['D', 'B', 'A'],
    ])).toBe(3);
  });

  it('exit if 2 x 2 is not found', () => {
    expect(solve([
      ['A', 'A', 0],
      ['A', 'A', 'A'],
      ['D', 'B', 'A'],
    ])).not.toBe(1);
  });

  it('continue if 2 x 2 is found', () => {
    expect(solve([
      ['A', 'A', 0],
      ['A', 'A', 'A'],
      ['D', 'B', 'A'],
    ])).toBe(5);
  });

  it('pulled down', () => {
    expect(solve([
      ['D', 'D', 0, 0],
      ['A', 'A', 0, 0],
      ['A', 'A', 'A', 0],
      [0, 0, 0, 0],
      ['D', 'D', 'A', 0],
    ])).toBe(18);
  });
});

function solution(m, n, board) {
  const arrayBoard = board.map((str) => [...str]);

  return solve(arrayBoard);
}

test('solution', () => {
  expect(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'])).toBe(14);
  expect(solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ'])).toBe(15);
});
