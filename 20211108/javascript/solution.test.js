function solution(sizes) {
  const max = (arr) => Math.max(...arr);
  const min = (arr) => Math.min(...arr);

  const multiply = (a, b) => a * b;

  return [max, min]
    .map((mapper) => sizes.map(mapper))
    .map(max)
    .reduce(multiply);
}

test('test works', () => {
  expect(solution([[60, 50], [30, 70], [60, 30], [80, 40]])).toBe(4000);
  expect(solution([[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]])).toBe(120);
});
