/* eslint-disable no-continue */
function detach(stickers, start, end) {
  const memory = {
    get(number) {
      if (!this[number]) {
        return 0;
      }

      return this[number];
    },
  };

  for (let s = end; s > start - 1; s--) {
    memory[s] = Math.max(
      stickers[s] + memory.get(s + 2),
      (s === end ? 0 : stickers[s + 1]) + memory.get(s + 3),
    );
  }

  return memory[start];
}

// test('detach', () => {
//   expect(detach([5, 11, 3, 9, 2], 0, 4)).toBe(20);
// });

function solution(stickers) {
  if (stickers.length <= 3) {
    return Math.max(...stickers);
  }

  const a = stickers[0] + detach(stickers, 2, stickers.length - 2);
  const b = stickers[1] + detach(stickers, 3, stickers.length - 1);
  const c = stickers[stickers.length - 1] + detach(stickers, 1, stickers.length - 3);

  return Math.max(a, b, c);
}

test('samples', () => {
  expect(solution([14, 6, 5, 11, 3, 9, 2, 10])).toBe(36);
  expect(solution([1, 3, 2, 5, 4])).toBe(8);
  expect(solution([1])).toBe(1);
  expect(solution([1, 3])).toBe(3);
  expect(solution([1, 8])).toBe(8);

  expect(solution([1, 8, 6])).toBe(8);
});
