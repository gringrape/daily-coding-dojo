function zip(arr) {
  const sum = arr.flatMap((el) => el).reduce((acc, curr) => acc + curr);
  const sumToResult = {
    [arr.length ** 2]: 1,
    0: 0,
  };
  const defaultResult = arr;

  const result = sumToResult[sum];

  return (result === 0 || result === 1) ? result : defaultResult;
}

test('zip', () => {
  expect(zip([
    [1, 1],
    [1, 1],
  ])).toBe(1);

  expect(zip([
    [1, 0],
    [0, 1],
  ])).toEqual([
    [1, 0],
    [0, 1],
  ]);

  expect(zip([
    [0, 0],
    [0, 0],
  ])).toBe(0);
});

function pickElementsInBoundary(rowBound, colBound, arr) {
  const [rowMin, rowMax] = rowBound;
  const [colMin, colMax] = colBound;

  return Array(rowMax - rowMin + 1)
    .fill()
    .map((_, i) => arr[i + rowMin])
    .map((row) => row.filter((_, j) => j >= colMin && j <= colMax))
    .map((el) => (el.length === 1 ? el[0] : el));
}

test('pickElementsInBoundary', () => {
  expect(pickElementsInBoundary(
    [2, 3],
    [0, 1],
    [
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ],
  )).toEqual([
    [1, 0],
    [1, 1],
  ]);

  expect(pickElementsInBoundary(
    [2, 3],
    [0, 1],
    [
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ],
  )).toEqual([
    [1, 0],
    [1, 1],
  ]);

  expect(pickElementsInBoundary(
    [1, 1],
    [1, 1],
    [
      [1, 1],
      [1, 0],
    ],
  )).toEqual([0]);
});

function comb(arr) {
  return arr.flatMap((el1) => arr.map((el2) => [el1, el2]));
}

test('comb', () => {
  expect(comb(['a', 'b'])).toEqual([
    ['a', 'a'],
    ['a', 'b'],
    ['b', 'a'],
    ['b', 'b'],
  ]);
});

function divideIntoFour(arr) {
  const len = arr.length;
  const half = arr.length / 2;

  return comb([[0, half - 1], [half, len - 1]])
    .map(([rowBound, colBound]) => pickElementsInBoundary(rowBound, colBound, arr));
}

test('divideIntoFour', () => {
  expect(divideIntoFour([
    [1, 1],
    [1, 1],
  ])).toEqual([
    [1], [1], [1], [1],
  ]);

  expect(divideIntoFour([
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ])).toEqual([
    [
      [1, 1],
      [1, 0],
    ],
    [
      [0, 0],
      [0, 0],
    ],
    [
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 1],
    ],
  ]);
});

function zipResult(arr) {
  const zipped = zip(arr);

  if (zipped === 0 || zipped === 1) {
    return zipped;
  }

  return divideIntoFour(arr).flatMap((part) => zipResult(part));
}

test('zipResult', () => {
  expect(zipResult([[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 1, 1]])).toEqual([
    1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1,
  ]);
});

function solution(arr) {
  const result = zipResult(arr);

  if (result === 0) {
    return [1, 0];
  }

  if (result === 1) {
    return [0, 1];
  }

  return [0, 1].map((each) => result.filter((el) => el === each).length);
}

test('solution', () => {
  expect(solution([[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 1, 1]])).toEqual([4, 9]);

  expect(solution([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ])).toEqual([10, 15]);

  expect(solution([
    [1, 1],
    [1, 1],
  ])).toEqual([0, 1]);
});
