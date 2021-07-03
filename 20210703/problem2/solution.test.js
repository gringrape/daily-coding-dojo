test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(numbers, target) {
  let count = 0;

  function go(index = 0, sum = 0) {
    if (index > numbers.length - 1) {
      if (sum === target) {
        count += 1;
      }
      return;
    }

    go(index + 1, sum + numbers[index]);
    go(index + 1, sum - numbers[index]);
  }

  go();
  return count;
}

test('samples', () => {
  expect(solution(
    [1, 1, 1, 1, 1],
    3,
  )).toBe(5);
});
