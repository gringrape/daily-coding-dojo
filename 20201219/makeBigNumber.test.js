function findOptions(n, k, p) {
  return n.slice(p, p + k + 1);
}

test('findOptions', () => {
  expect(findOptions(
    [4, 1, 7, 7, 2, 5], 3, 0,
  )).toEqual([4, 1, 7, 7]);

  expect(findOptions(
    [4, 1, 7, 7, 2, 5], 3, 1,
  )).toEqual([1, 7, 7, 2]);

  expect(findOptions(
    [4, 1, 7, 7, 2, 5], 2, 2,
  )).toEqual([7, 7, 2]);

  expect(findOptions(
    [1, 1], 1, 0,
  )).toEqual([1, 1]);
});

function determineDeleteNumber(options) {
  const max = Math.max(...options);

  return options.findIndex((option) => option === max);
}

test('determineDeleteNumber', () => {
  expect(determineDeleteNumber([4, 1, 7, 7])).toBe(2);
  expect(determineDeleteNumber([1, 7, 7, 2])).toBe(1);
  expect(determineDeleteNumber([8, 5, 7, 2])).toBe(0);
});

function deleteNumsAt(n, p, d) {
  n.splice(p, d);
  return n;
  // 오류발생
  // return [...n.slice(0, p), ...n.slice(p + d)];
}

test('delete', () => {
  expect(deleteNumsAt([4, 1, 5, 5, 3], 2, 1)).toEqual([4, 1, 5, 3]);
  expect(deleteNumsAt([4, 1, 5, 5, 3], 0, 2)).toEqual([5, 5, 3]);
  expect(deleteNumsAt([4, 1, 5, 5, 3], 4, 1)).toEqual([4, 1, 5, 5]);
  expect(deleteNumsAt([1, 1], 0, 1)).toEqual([1]);
});

function makeBigNumber(n, k, p = 0) {
  if (k === 0) {
    return n;
  }

  if (k === n.length - p) {
    return n.slice(0, p);
  }

  const options = findOptions(n, k, p);
  const deleteNumber = determineDeleteNumber(options);
  const updatedN = deleteNumsAt(n, p, deleteNumber);

  return makeBigNumber(updatedN, k - deleteNumber, p + 1);
}

test('makeBigNumber', () => {
  expect(makeBigNumber([1, 9, 2, 4], 2)).toEqual([9, 4]);
  expect(makeBigNumber([1, 2, 3, 1, 2, 3, 4], 3)).toEqual([3, 2, 3, 4]);
  expect(makeBigNumber([4, 1, 7, 7, 2, 5, 2, 8, 4, 1], 4)).toEqual([7, 7, 5, 8, 4, 1]);
});

function solution(number, k) {
  const parse = (num) => parseInt(num, 10);
  return makeBigNumber([...number].map(parse), k).join('');
}

test('solution', () => {
  expect(solution('11', 1)).toEqual('1');
  expect(solution('2222', 2)).toEqual('22');
  expect(solution('10', 1)).toEqual('1');
  expect(solution('10000', 2)).toEqual('100');
  expect(solution('99998', 3)).toEqual('99');
  expect(solution('999999', 3)).toEqual('999');
  expect(solution('1001', 2)).toEqual('11');
});
