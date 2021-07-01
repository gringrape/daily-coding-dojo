test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(n) {
  return parseInt(
    n.toString(3).split('').reverse().join(''),
    3,
  );
}

test('samples', () => {
  expect(solution(45)).toBe(7);
});
