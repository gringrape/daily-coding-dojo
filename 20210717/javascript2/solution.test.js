test('test works', () => {
  expect(1 + 1).toBe(2);
});

function range(start, end) {
  return [...Array(end - start)].map((_, i) => start + i);
}

function solution(n) {
  function count({ row, path }) {
    if (row > n - 1) {
      return 1;
    }

    const verticalSafe = (column) => path.every(([, c]) => c !== column);
    const diagonalSafe = (column) => path.every(([r, c]) => {
      const [distX, distY] = [row - r, column - c].map((i) => Math.abs(i));
      return distX !== distY;
    });

    return range(0, n)
      .filter((column) => verticalSafe(column) && diagonalSafe(column))
      .reduce((accumulator, column) => (
        accumulator + count({
          row: row + 1,
          path: [...path, [row, column]],
        })
      ), 0);
  }

  return count({ row: 0, path: [] });
}

test('sample', () => {
  expect(solution(4)).toBe(2);
});
