function countMatched(lottos, winNums) {
  return winNums
    .reduce((a, n) => (lottos.includes(n) ? a + 1 : a), 0);
}

function countZerosOf(lottos) {
  return lottos
    .reduce((a, n) => (n === 0 ? a + 1 : a), 0);
}

function rankOf(matched) {
  if (matched < 2) {
    return 6;
  }

  return 7 - matched;
}

function solution(lottos, winNums) {
  return [
    rankOf(countZerosOf(lottos) + countMatched(lottos, winNums)),
    rankOf(countMatched(lottos, winNums)),
  ];
}

describe('countMatched', () => {
  context('with lottos not containing zeros', () => {
    const lottos = [11, 12, 13, 14, 15, 16];
    const winNums = [20, 11, 8, 14, 7, 35];

    it('returns count of matched', () => {
      expect(countMatched(
        lottos,
        winNums,
      )).toBe(2);
    });
  });

  context('with lottos contaning zeros', () => {
    const lottos = [11, 0, 0, 0, 15, 16];
    const winNums = [20, 11, 8, 14, 7, 35];

    it('returns count of matched', () => {
      expect(countMatched(lottos, winNums)).toBe(1);
    });
  });
});

test('countZerosOf', () => {
  expect(countZerosOf([0, 0, 0, 15, 25, 7])).toBe(3);
});

test('rankOf', () => {
  expect(rankOf(6)).toBe(1);
  expect(rankOf(5)).toBe(2);
  expect(rankOf(0)).toBe(6);
});

test('solution', () => {
  expect(
    solution(
      [44, 1, 0, 0, 31, 25],
      [31, 10, 45, 1, 6, 19],
    ),
  ).toEqual([3, 5]);
});
