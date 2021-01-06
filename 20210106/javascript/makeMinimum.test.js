function solution(A, B) {
  const inc = (a, b) => a - b;
  const dec = (a, b) => b - a;

  A.sort(inc);
  B.sort(dec);

  return A.reduce((acc, a, i) => acc + a * B[i], 0);
}

test('simple', () => {
  expect(solution([2], [3])).toBe(6);
  expect(solution([1, 4], [2, 3])).toBe(11);
  expect(solution([1, 2], [3, 4])).toBe(10);
  expect(solution([1, 4, 2], [5, 4, 4])).toBe(29);
});
