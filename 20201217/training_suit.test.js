function getMyReserve({lost, reserve}) {
  const getFilter = (array) => (student) => !array.includes(student);

  return {
    lost: lost.filter(getFilter(reserve)),
    reserve: reserve.filter(getFilter(lost)),
  }
}

test('getMyReserve', () => {
  expect(getMyReserve({lost: [1, 3], reserve: [1, 2]})).toEqual({
    lost: [3],
    reserve: [2], 
  });

  expect(getMyReserve({lost: [1, 2, 4, 6], reserve: [1, 2, 3]})).toEqual({
    lost: [4, 6],
    reserve: [3], 
  });

  expect(getMyReserve({lost: [1, 2, 4, 6, 8], reserve: [1, 2, 4, 6]})).toEqual({
    lost: [8],
    reserve: [], 
  });
});

function canBorrow({ lost, reserve }) {
  if (reserve.includes(lost - 1)) {
    return 'LEFT';
  }
  if (reserve.includes(lost + 1)) {
    return 'RIGHT';
  }
  return 'NO';
}

test('canBorrow', () => {
  expect(canBorrow({lost: 1, reserve: [2]})).toEqual('RIGHT');
  expect(canBorrow({lost: 2, reserve: [1]})).toEqual('LEFT');
  expect(canBorrow({lost: 2, reserve: [1, 3]})).toEqual('LEFT');
  expect(canBorrow({lost: 2, reserve: [4]})).toEqual('NO');
});

function borrowAll({ lost, reserve }) {
  return lost.reduce((acc, student) => {
    const { lost, reserve } = acc;
    const borrowable = canBorrow({ lost:student, reserve});

    if (borrowable === 'NO') {
      return acc;
    }

    const borrower = {
      'LEFT': student - 1,
      'RIGHT': student + 1,
    };

    return {
      lost: lost.filter((each) => each !== student),
      reserve: reserve.filter((each) => each !== borrower[borrowable]),
    }

  }, { lost, reserve });
}

test('borrowAll', () => {
  expect(borrowAll({lost: [1, 3, 5], reserve: [2, 4, 8]})).toEqual({
    lost: [5],
    reserve: [8],
  });

  expect(borrowAll({lost: [2, 4], reserve: [1, 3, 5]})).toEqual({
    lost: [],
    reserve: [5],
  });

  expect(borrowAll({lost: [3], reserve: [2]})).toEqual({
    lost: [],
    reserve: [],
  });
});

function solution(n, lost, reserve) {
  const { lost: finalLost } = borrowAll(getMyReserve({ lost, reserve }));

  return n - finalLost.length;
}

test('solution', () => {
  expect(solution(5, [2, 4], [1, 3, 5])).toBe(5);
  expect(solution(5, [2, 4], [3])).toBe(4);
  expect(solution(3, [3], [1])).toBe(2);
  expect(solution(5, [2, 3], [1, 2])).toBe(4);
  expect(solution(2, [1], [1])).toBe(2);
  expect(solution(5, [1, 3, 4, 5], [5])).toBe(2);
  expect(solution(30, [1, 3, 4, 5, 24, 25], [1, 3, 4, 5])).toBe(28);
  expect(solution(30, [2], [1])).toBe(30);
  expect(solution(3, [1, 3], [1, 2])).toBe(3);
});
