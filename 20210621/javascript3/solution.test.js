/* eslint-disable no-unused-vars */
test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function solution(begin, target, words) {
  function countMismatch(word1, word2) {
    return Array(word1.length).fill().map((_, i) => i)
      .filter((i) => word1[i] !== word2[i]).length;
  }

  if (!words.some((word) => word === target)) {
    return 0;
  }

  let step = 0;
  const q = [];
  q.push(begin);
  while (q.length > 0) {
    step += 1;
    const visits = q.length;

    for (let i = 0; i < visits; i++) {
      const current = q.shift();

      if (current === target) {
        return step - 1;
      }

      const nextWords = words
        .filter((word) => countMismatch(current, word) === 1);
      nextWords.forEach((nextWord) => q.push(nextWord));
    }
  }
  return 4;
}

test('samples', () => {
  expect(solution(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
  )).toBe(4);
  expect(solution(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log'],
  )).toBe(0);
});
