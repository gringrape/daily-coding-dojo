// 1. 인형을 든다
function liftDoll(board, position) {
  const foundIndex = board
    .map((row) => row[position - 1])
    .findIndex(el => el > 0);
  
  if (foundIndex === - 1) {
    return null;
  }

  return [board[foundIndex][position - 1], foundIndex + 1];
}

test('liftDoll', () => {
  expect(liftDoll(
    [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]],
    1
  )).toEqual([4, 4]);

  expect(liftDoll(
    [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]],
    2
  )).toEqual([2, 3]);

  expect(liftDoll(
    [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[0,2,4,4,2],[0,5,1,3,1]],
    1
  )).toBe(null);
});

// 2. 바구니에 인형을 넣는다.
function put(doll, basket = []) {
  return [...basket, doll];
}

test('put', () => {
  expect(put(1, [])).toEqual([1]);

  expect(put(2, [1, 3])).toEqual([1, 3, 2]);
});

function getLast(array) {
  return array.slice(-1)[0];
}

// 3. 터진 인형을 센다
function count(doll, basket = []) {
  if (getLast(basket) !== doll) {
    return 0;
  }
  return 1;
}

test('count', () => {
  expect(count(1, [1])).toBe(1);

  expect(count(3, [1, 3])).toEqual(1);
});

function bang(basket) {
  return basket.slice(0, -1);
}

// 3. 터진 인형을 센다 #2
function countMul(dolls, basket = [], count = 0) {
  if (dolls.length === 0) {
    return count;
  }
  
  const currentDoll = dolls[0];

  return (getLast(basket) === currentDoll) 
    ? countMul(dolls.slice(1), bang(basket), count + 2)
    : countMul(dolls.slice(1), put(currentDoll, basket), count);
}

test('countMul', () => {
  expect(countMul([2, 1], [1, 2])).toBe(4);
  expect(countMul([5, 4, 2, 2], [1, 3, 4, 5])).toBe(6);
  expect(countMul([4, 3, 1, 1, 3, 2, 4], [])).toBe(4);
});

function makeEmpty(twoDimArray, i, j) {
  return twoDimArray
    .map((row, rIdx) => row
      .map((num, cIdx) => (rIdx === i && cIdx === j) ? 0 : num)
    )
}

// 4. 인형을 여러번 든다.
function* liftDolls(board, moves) {
  const [doll, j] = liftDoll(board, moves[0]) ?? [];

  if (moves.length === 0 || !doll) {
    return;
  }

  yield doll;
  const updatedBoard = makeEmpty(board, j - 1, moves[0] - 1);
  yield* liftDolls(updatedBoard, moves.slice(1));
}

test('liftDolls', () => {
  const it = liftDolls([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1, 1, 1]);
  expect([...it]).toEqual([4, 3]);
})

// test('liftDolls', () => {
//   expect([...liftDolls([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1, 1])])
//     .toEqual([4, 3]);
// });


function solution(board, moves) {
  const dolls = [...liftDolls(board, moves)];

  return countMul(dolls);
}

test('solution', () => {
  expect(solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]))
    .toBe(4);
});
