function countBit(num, count = 0) {
  if (num === 0) {
    return count;
  }
  return countBit(num & (num - 1), count + 1);
}

test('countBit', () => {
  expect(countBit(1)).toBe(1);
  expect(countBit(2)).toBe(1);
  expect(countBit(4)).toBe(1);
  expect(countBit(8)).toBe(1);
  expect(countBit(15)).toBe(4);
});

function solution(n, inc = 1, nBit = countBit(n)) {
  const curr = n + inc;
  return (nBit === countBit(curr)) ? curr : solution(n, inc + 1);
}

test('simple', () => {
  expect(solution(1)).toBe(2);
  expect(solution(2)).toBe(4);
  expect(solution(3)).toBe(5);
  expect(solution(4)).toBe(8);
});
