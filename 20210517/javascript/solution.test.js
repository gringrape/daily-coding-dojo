function countSame(array, n) {
  return array.filter((v) => v === n).length;
}

function countLarger(array, n) {
  return array.filter((stageNumber) => stageNumber >= n).length;
}

function range(from, to) {
  return Array(to - from).fill().map((_, i) => from + i);
}

function solution(N, stages) {
  stages.sort();

  return range(1, N + 1)
    .map((i) => [i, countSame(stages, i) / countLarger(stages, i)])
    .sort(([, v1], [, v2]) => v2 - v1)
    .map(([k]) => k);
}

test('solution function existence', () => {
  expect(solution(1, [1]));
});

test('simple', () => {
  expect(solution(2, [1, 2])).toEqual([2, 1]);
});

test('many stages', () => {
  expect(solution(5, [2, 1, 2, 6, 2, 4, 3, 3])).toEqual([3, 4, 2, 1, 5]);
});
