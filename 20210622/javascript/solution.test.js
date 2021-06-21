test('test is working ', () => {
  expect(1 + 1).toBe(2);
});

function solution(n, times) {
  const record = Array(n).fill(0);

  Array(n).fill().forEach(() => {
    const minIndex = record
      .map((r, i) => [r + times[i], i])
      .sort(([r1], [r2]) => r1 - r2)
      .map(([, i]) => i)[0];

    record[minIndex] += times[minIndex];
  });

  return Math.max(...record);
}

test('samples', () => {
  expect(solution(6, [7, 10])).toBe(28);
});
