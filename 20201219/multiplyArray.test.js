function selectColumn(arr) {
  return (i) => arr.map((row) => row[i]);
}

test('selectColumn', () => {
  expect(selectColumn([
    [1, 1],
    [3, 5],
    [2, 3],
  ])(1)).toEqual([1, 5, 3]);

  expect(selectColumn([
    [1, 1],
    [3, 5],
    [2, 3],
  ])(1)).toEqual([1, 5, 3]);
});

function findResultSize(arr1, arr2) {
  return [arr1.length, arr2[0].length];
}

test('findResultSize', () => {
  expect(findResultSize(
    [
      [1, 4],
      [3, 2],
      [4, 1],
    ],
    [
      [3, 3],
      [3, 3],
    ],
  )).toEqual([3, 2]);
});

function multiplyLineArray(arr1, arr2) {
  return arr1.reduce((result, el, i) => result + el * arr2[i], 0);
}

test('multiplyLineArray', () => {
  expect(multiplyLineArray([1, 2, 3], [1, 2, 3])).toBe(14);
  expect(multiplyLineArray([5, 5, 3], [6, 6, 3])).toBe(69);
});

function solution(arr1, arr2) {
  const [rowSize, colSize] = findResultSize(arr1, arr2);
  const selectColFromArr2 = selectColumn(arr2);

  return Array(rowSize)
    .fill(
      Array(colSize).fill(0),
    )
    .map((r, i) => r
      .map((_, j) => multiplyLineArray(arr1[i], selectColFromArr2(j))));
}

test('solution', () => {
  expect(solution([[1, 4], [3, 2], [4, 1]], [[3, 3], [3, 3]]))
    .toEqual([[15, 15], [15, 15], [15, 15]]);
});
