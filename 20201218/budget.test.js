function findCount(d, budget, count = 0) {
  const currentBudget = budget - d[0];
  if (currentBudget < 0 || d.length === 0) {
    return count;
  }

  return findCount(d.slice(1), currentBudget, count + 1);
}

function solution(d, budget) {
  return findCount(d.sort((a, b) => a - b), budget);
}

test('solution', () => {
  expect(solution([1, 3, 2, 5, 4], 9)).toBe(3);
  expect(solution([2, 2, 3, 3], 10)).toBe(4);
});
