function solve(triangle, i = 0, j = 0, record = triangle.map((row) => row.map(() => -1))) {
  if (i === triangle.length - 1) {
    return triangle[i][j];
  }

  if (record[i][j] === -1) {
    // eslint-disable-next-line no-param-reassign
    record[i][j] = triangle[i][j] + Math.max(
      solve(triangle, i + 1, j, record),
      solve(triangle, i + 1, j + 1, record),
    );
  }

  return record[i][j];
}

test('simple', () => {
  expect(solve([[7]])).toBe(7);
  expect(solve([[7], [3, 8]])).toBe(15);
  expect(solve([[7], [3, 8], [8, 1, 0]])).toBe(18);
});
