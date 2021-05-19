function hasOddDevisors(number) {
  return Number.isInteger(
    Math.sqrt(number),
  );
}

test('hasOddDevisors', () => {
  expect(hasOddDevisors(1)).toBe(true);
  expect(hasOddDevisors(4)).toBe(true);
  expect(hasOddDevisors(9)).toBe(true);

  expect(hasOddDevisors(2)).toBe(false);
  expect(hasOddDevisors(6)).toBe(false);
  expect(hasOddDevisors(8)).toBe(false);
});

function solution(left, right) {
  function sumInRange(start, end, sum) {
    if (start > end) {
      return sum;
    }

    const sign = hasOddDevisors(start) ? -1 : +1;
    const increment = sign * start;

    return sumInRange(
      start + 1,
      end,
      sum + increment,
    );
  }

  return sumInRange(left, right, 0);
}

test('test environment has no problem', () => {
  expect(1 + 1).toBe(2);
});

test('solution function exists', () => {
  expect(solution(1, 3));
});

test('simple', () => {
  expect(solution(1, 1)).toBe(-1);
  expect(solution(1, 2)).toBe(1);
  expect(solution(1, 3)).toBe(4);
});
