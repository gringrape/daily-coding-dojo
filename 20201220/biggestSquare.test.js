function isNotSquare(startI, startJ, arr, size) {
  return arr
    .filter((_, r) => r >= startI && r <= startI + size)
    .flatMap((row) => row.filter((_, c) => c >= startJ && c <= startJ + size))
    .some((el) => el === 0);
}

function findBiggestSquareSizeAt(i, j, arr, count = 0) {
  const isOutOfBoundary = i + count >= arr.length || j + count >= arr[0].length;

  if (isOutOfBoundary || isNotSquare(i, j, arr, count)) {
    return count;
  }

  return findBiggestSquareSizeAt(i, j, arr, count + 1);
}

test('findBiggestSquareSizeAt', () => {
  expect(findBiggestSquareSizeAt(0, 1, [
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ])).toBe(3);

  expect(findBiggestSquareSizeAt(0, 0, [
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ])).toBe(0);

  expect(findBiggestSquareSizeAt(1, 2, [
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ])).toBe(2);
});

function solution(arr) {
  const localBiggest = arr
    .flatMap((row, i) => row
      .map((_, j) => findBiggestSquareSizeAt(i, j, arr)));

  const globalBiggest = Math.max(...localBiggest);

  return globalBiggest ** 2;
}

test('solution', () => {
  expect(solution([[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 1, 0]])).toBe(9);
  expect(solution([[0, 0, 1, 1], [1, 1, 1, 1]])).toBe(4);
});
