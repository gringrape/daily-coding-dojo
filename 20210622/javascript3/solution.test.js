test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(works, n) {
  const numberOfWorks = works.length;
  const remainingWorks = works.reduce((a, b) => a + b, 0) - n;

  if (remainingWorks <= 0) {
    return 0;
  }

  const equallyDistributed = Math.floor(remainingWorks / numberOfWorks);
  const remainder = remainingWorks % numberOfWorks;

  return (equallyDistributed + 1) ** 2 * remainder
   + equallyDistributed ** 2 * (numberOfWorks - remainder);
}

test('samples', () => {
  expect(solution([4, 3, 3], 4)).toBe(12);
  // expect(solution([2, 1, 2], 1)).toBe(6);
  // expect(solution([1, 1], 3)).toBe(0);
  // expect(solution([2, 15, 22, 55, 55], 99)).toBe(580);
});
