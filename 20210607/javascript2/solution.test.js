test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function rangeInclusive(from, to) {
  return Array(to - from + 1).fill()
    .map((_, i) => i + from);
}

test('rangeInclusive', () => {
  expect(rangeInclusive(1, 3)).toEqual([1, 2, 3]);
  expect(rangeInclusive(50, 55)).toEqual([50, 51, 52, 53, 54, 55]);
});

function rotate(query, array) {
  const [r1, c1, r2, c2] = query;
  const [x1, y1, x2, y2] = [r1 - 1, c1 - 1, r2 - 1, c2 - 1];

  const newArray = JSON.parse(JSON.stringify(array));

  rangeInclusive(y1, y2 - 1).forEach((y) => {
    newArray[x1][y + 1] = array[x1][y];
  });
  rangeInclusive(y1 + 1, y2).forEach((y) => {
    newArray[x2][y - 1] = array[x2][y];
  });
  rangeInclusive(x1 + 1, x2).forEach((x) => {
    newArray[x - 1][y1] = array[x][y1];
  });
  rangeInclusive(x1, x2 - 1).forEach((x) => {
    newArray[x + 1][y2] = array[x][y2];
  });

  return newArray;
}

describe('rotate', () => {
  it('rotates rectangle clockwise', () => {
    expect(
      rotate(
        [1, 1, 2, 2],
        [
          [1, 2],
          [3, 4],
        ],
      ),
    ).toEqual([
      [3, 1],
      [4, 2],
    ]);
  });
});

function diff(arr1, arr2, r, c) {
  const result = [];

  rangeInclusive(0, r - 1).forEach((x) => {
    rangeInclusive(0, c - 1).forEach((y) => {
      if (arr1[x][y] !== arr2[x][y]) {
        result.push(arr1[x][y]);
      }
    });
  });

  return result;
}

test('diff', () => {
  expect(diff(
    [
      [1, 2],
      [3, 4],
    ],
    [
      [4, 2],
      [3, 1],
    ],
    2, 2,
  )).toEqual([1, 4]);

  expect(Math.min(...[1, 4])).toBe(1);
});

function solution(rows, columns, queries) {
  const initialArray = rangeInclusive(0, rows - 1)
    .map((r) => rangeInclusive(1, columns).map((c) => c + r * columns));

  const { mins } = queries.reduce((acc, query) => {
    const newArray = rotate(query, acc.array);
    const min = Math.min(...diff(acc.array, newArray, rows, columns));

    return {
      array: newArray,
      mins: [...acc.mins, min],
    };
  }, {
    array: initialArray,
    mins: [],
  });

  return mins;
}

test('example', () => {
  expect(solution(6, 6, [[2, 2, 5, 4], [3, 3, 6, 6], [5, 1, 6, 3]])).toEqual(
    [8, 10, 25],
  );
  expect(solution(3, 3, [[1, 1, 2, 2], [1, 2, 2, 3], [2, 1, 3, 2], [2, 2, 3, 3]])).toEqual(
    [1, 1, 5, 3],
  );
  expect(solution(100, 97, [[1, 1, 100, 97]])).toEqual(
    [1],
  );
});
