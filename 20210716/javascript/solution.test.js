function detach(stickers, i) {
  const max = [];

  const { length: l } = stickers;

  max[l - 1] = stickers[l - 1];
  [max[l], max[l + 1]] = [0, 0];

  for (let n = l - 2; n > -1; n--) {
    max[n] = Math.max(
      stickers[n] + max[n + 2],
      stickers[n + 1] + max[n + 3],
    );
  }

  return max[i];
}

function solution(stickers) {
  const { length: l } = stickers;

  if (l < 4) {
    return Math.max(...stickers);
  }

  const maxA = detach(stickers, 1);

  stickers.pop();
  const maxB = detach(stickers, 0);

  return Math.max(maxA, maxB);
}

test('samples', () => {
  expect(solution([1, 3, 2, 5, 4])).toBe(8);
  expect(solution([1, 8, 6])).toBe(8);
  expect(solution([1, 3])).toBe(3);
  expect(solution([1, 8])).toBe(8);
  expect(solution([1])).toBe(1);

  expect(solution([14, 6, 5, 11, 3, 9, 2, 10])).toBe(36);
});
