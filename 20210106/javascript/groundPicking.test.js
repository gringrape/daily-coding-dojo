function solution(land) {
  land.forEach((row, i) => {
    row.forEach((col, j) => {
      if (i === 0) {
        return;
      }
      row[j] = col + Math.max(...land[i - 1].filter((_, k) => k !== j));
    });
  });
  return Math.max(...land[land.length - 1]);
}

test('simple', () => {
  expect(solution([[1, 2, 3, 5]])).toBe(5);
  expect(solution([[1, 2, 3, 5], [5, 6, 7, 8]])).toBe(12);
  expect(solution([
    [1, 2, 3, 5],
    [5, 6, 7, 8],
    [4, 3, 2, 1],
  ])).toBe(16);
  expect(solution([
    [1, 2, 3, 5],
    [5, 6, 7, 8],
    [4, 3, 2, 1],
    [1, 1, 1, 5],
  ])).toBe(21);
});
