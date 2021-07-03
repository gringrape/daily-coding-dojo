/* eslint-disable no-param-reassign */
test('test works', () => {
  expect(1 + 1).toBe(2);
});

function pick(board, n) {
  const line = board.map((row) => row[n - 1]);
  const position = line.findIndex((d) => d !== 0);

  if (position < 0) {
    return null;
  }

  const doll = line[position];

  board[position][n - 1] = 0;

  return doll;
}

test('pick', () => {
  const board = [
    [1, 0],
    [2, 3],
  ];

  expect(pick(board, 1)).toBe(1);
  expect(pick(board, 1)).toBe(2);
  expect(pick(board, 1)).toBeNull();
});

class Basket {
  constructor() {
    this.data = [];
    this.count = 0;
  }

  size() {
    return this.data.length;
  }

  put(doll) {
    if (this.data[this.data.length - 1] === doll) {
      this.data.pop();
      this.count += 2;
      return;
    }

    this.data.push(doll);
  }
}

describe('Basket', () => {
  test('put', () => {
    const basket = new Basket();

    basket.put(1);
    expect(basket.size()).toBe(1);

    basket.put(1);
    expect(basket.size()).toBe(0);
    expect(basket.count).toBe(2);
  });
});

function solution(board, moves) {
  const dolls = moves.map((move) => pick(board, move));
  const basket = new Basket();

  dolls
    .filter((i) => i)
    .forEach((doll) => basket.put(doll));

  return basket.count;
}

test('samples', () => {
  expect(solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4],
  )).toBe(4);
});
