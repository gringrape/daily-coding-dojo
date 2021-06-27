test('test works', () => {
  expect(1 + 1).toBe(2);
});

function sum(array) {
  return array.reduce((a, c) => a + c, 0);
}

function solution(d, budget) {
  const position = d
    .sort((a, b) => a - b)
    .findIndex((_, i, array) => sum(array.slice(0, i + 1)) > budget);

  const notFound = position === -1;

  return notFound ? d.length : position;
}

test('samples', () => {
  expect(solution([1, 3, 2, 5, 4], 9)).toBe(3);
  expect(solution([2, 2, 3, 3], 10)).toBe(4);
});
