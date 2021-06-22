test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(nums) {
  const kinds = (new Set(nums)).size;
  const N = nums.length;

  return Math.min(kinds, N / 2);
}

test('samples', () => {
  expect(solution([3, 1, 2, 3])).toBe(2);
  expect(solution([3, 3, 3, 2, 2, 4])).toBe(3);
  expect(solution([3, 3, 3, 2, 2, 2])).toBe(2);
});
