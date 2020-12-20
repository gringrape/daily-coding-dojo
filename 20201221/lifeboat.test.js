function solution(
  people,
  limit,
  sorted = people.sort((a, b) => a - b),
  count = 0,
) {
  if (sorted.length === 0) {
    return count;
  }

  const [first] = sorted;

  const secondIndex = sorted.findIndex((weight) => weight > limit - first) - 1;

  if (secondIndex > 0) {
    sorted.splice(secondIndex, 1);
    sorted.shift();
    return solution(people, limit, sorted, count + 1);
  }

  if (secondIndex === -2) {
    sorted.pop();
    sorted.shift();

    return solution(people,
      limit,
      sorted, count + 1);
  }

  sorted.shift();

  return solution(people, limit, sorted, count + 1);
}

test('solution', () => {
  expect(solution([], 100)).toBe(0);
  expect(solution([100], 100)).toBe(1);
  expect(solution([100, 100], 100)).toBe(2);
  expect(solution([40, 40], 100)).toBe(1);
  expect(solution([70, 80, 50], 100)).toBe(3);
  expect(solution([40, 40, 80, 80], 140)).toBe(2);
  // expect(solution([70, 50, 80, 50])).toBe(3);
});
