function findGCF(n1, n2, c = Math.min(n1, n2)) {
  if (n1 % c === 0 && n2 % c === 0) {
    return c;
  }
  return findGCF(n1, n2, c - 1);
}

test('findGCF', () => {
  expect(findGCF(15, 105)).toBe(15);
  expect(findGCF(20, 50)).toBe(10);
  // one of each 1
  expect(findGCF(20, 1)).toBe(1);
});

function findLCM(n1, n2) {
  return (n1 * n2) / findGCF(n1, n2);
}

function solution(array) {
  if (array.length === 1) {
    return array[0];
  }

  return solution([
    findLCM(array[0], array[1]),
    ...array.slice(2),
  ]);
}

test('solution', () => {
  expect(solution([2])).toBe(2);
  expect(solution([1, 2, 3])).toBe(6);
});
