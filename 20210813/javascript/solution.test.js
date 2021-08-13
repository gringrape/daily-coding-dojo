function solution(board, r, c) {
  const boardClone = JSON.parse(JSON.stringify(board));

  const selectCount = board.flat()
    .filter((i) => i).length;
  const moveCount = 3;

  const selected = null;
  let current = [r, c];

  const isEmpty = () => boardClone
    .flat().reduce((a, i) => a + i, 0) === 0;

  const chooseRandom = () => {
    const [currentR, currentC] = current;
    if (board[currentR][currentC]) {
      return current;
    }

    // 아무거나 찾기
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (boardClone[i][j]) {
          return [i, j];
        }
      }
    }

    return null;
  };

  while (!isEmpty()) {
    if (!selected) {
      // 자기 자신 or 가장 가까운 아무거나 선택
      current = chooseRandom(current);
      // 이동
    }
    // 똑 같은 카드 찾아서 선택
    // 이동
    break;
  }

  return selectCount + moveCount;
}

test('simple', () => {
  expect(solution([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
  ], 0, 1)).toBe(5);
});
