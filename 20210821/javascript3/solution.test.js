function solution(arr) {
  let count = 0;

  let prev = 0;
  const record = new Set();

  arr.forEach((number) => {
    if (number && !record.has(number)) {
      record.add(number);
      count += 1;
    }

    if (number < prev) {
      record.delete(prev);
    }

    prev = number;
  });

  return count;
}

test('sample', () => {
  expect(solution([1, 2, 4, 8, 4, 2, 1])).toBe(4);
  expect(solution([1, 3, 5, 7, 6, 8, 9, 5, 1])).toBe(7);
  expect(solution([10, 0, 10, 0, 10, 0])).toBe(3);
  expect(solution([5, 4, 5, 4, 5, 5])).toBe(4);
  expect(solution([1, 2, 3, 2, 1, 0, 2, 4, 5, 3, 1, 0])).toBe(8);
  expect(solution([1, 2, 3, 3, 2, 1, 0, 1, 2, 3, 2, 1])).toBe(6);
  expect(solution([3, 1, 0, 4, 1, 0, 3, 1])).toBe(6);
  expect(solution([8, 1, 0, 8, 1, 0, 8, 1, 0])).toBe(6);
});
