test('test is working', () => {
  expect(1 + 1).toBe(2);
});

// ## 구하는 것
// 터트려져 사라진 인형의 개수
// ## 주어진 것
// - 게임화면 격자 상태 - board
// - 크레인을 작동시킨 위치 배열 - moves
// ## 조건
// 크레인을 작동시킨 위치 -> board 의 열 번호 +1
// 게임화면 격자 크기 -> N*N 정사각형
// 인형이 바구니(스택)에 담길 때  같은 모양의 인형이 두개가 연속되면 터뜨려진다.

test('test is working', () => {
  function solution(board, moves) {
    const answer = 0;
    return answer;
  }~~expect(1 + 1).toBe(2);
});

function pick(board, move) {
  const column = board.map((row) => row[move - 1]);
  const dollIndex = column.findIndex((doll) => doll !== 0);
  if (dollIndex < 0) {
    return null;
  }
  const doll = board[dollIndex][move - 1];
  board[dollIndex][move - 1] = 0;
  return doll;
}

test('pick at the same column', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  expect(pick(board, 1)).toBe(4);
  expect(pick(board, 1)).toBe(3);
});

test('pick at the different column', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  expect(pick(board, 1)).toBe(4);
  expect(pick(board, 2)).toBe(2);
});

test('pick at empty column', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [0, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  pick(board, 1);

  expect(pick(board, 1)).toBe(null);
});

function put(basket, doll) {
  const basketSize = basket.length;

  if (basketSize === 0) {
    basket.push(doll);
    return 0;
  }

  const lastdollIndBasket = basket[basketSize - 1];

  if (doll === lastdollIndBasket) {
    basket.pop();
    return 2;
  }

  basket.push(doll);
  return 0;
}

test('put doll into basket', () => {
  const basket = [];

  expect(put(basket, 1)).toBe(0);

  expect(basket[0]).toBe(1);
});

test('if we put same doll then, bomb!', () => {
  const basket = [];

  put(basket, 1);

  expect(put(basket, 1)).toBe(2);
  expect(basket[0]).toBeUndefined();
});

function solution(board, moves) {
  const basket = [];
  let count = 0;
  moves.forEach((move) => {
    const doll = pick(board, move);

    if (!doll) {
      return;
    }

    const popCount = put(basket, doll);
    count += popCount;
  });

  return count;
}

// 2
// 2
// 1

test('solution', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [0, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];
  const moves = [1, 5, 3, 5, 1, 2, 1, 4];

  expect(solution(board, moves)).toBe(4);
});
