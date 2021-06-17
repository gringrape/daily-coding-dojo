test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function solution(lottos, winNums) {
  const rankOf = (count) => (count < 2 ? 6 : 7 - count);

  const winCount = lottos.filter((n) => winNums.includes(n)).length;
  const zeroCount = lottos.filter((n) => n === 0).length;

  return [winCount + zeroCount, winCount]
    .map(rankOf);
}

test('solution', () => {
  expect(solution(
    [44, 1, 0, 0, 31, 25],
    [31, 10, 45, 1, 6, 19],
  )).toEqual([3, 5]);

  expect(solution(
    [0, 0, 0, 0, 0, 0],
    [38, 19, 20, 40, 15, 25],
  )).toEqual([1, 6]);

  expect(solution(
    [45, 4, 35, 20, 3, 9],
    [20, 9, 3, 45, 4, 35],
  )).toEqual([1, 1]);
});
