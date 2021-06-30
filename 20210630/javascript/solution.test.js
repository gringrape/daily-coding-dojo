test('test works', () => {
  expect(1 + 1).toBe(2);
});

function zip(array1, array2) {
  return Array(array1.length).fill()
    .map((_, i) => i)
    .map((i) => [array1[i], array2[i]]);
}

function solution(A, B) {
  return zip(A, B)
    .map(([a, b]) => a * b)
    .reduce((a, c) => a + c, 0);
}

test('samples', () => {
  expect(solution(
    [1, 2, 3, 4],
    [-3, -1, 0, 2],
  )).toBe(3);
});
