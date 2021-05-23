function score(answers) {
  return (pattern) => {
    const parsedPattern = [...pattern].map((p) => parseInt(p, 10));
    return answers
      .filter((a, i) => a === parsedPattern[i % pattern.length])
      .length;
  };
}

test('score', () => {
  expect(score([1])('1')).toBe(1);
  expect(score([2])('1')).toBe(0);
  expect(score([3])('1')).toBe(0);

  expect(score([1, 2, 3, 4, 5])('12345')).toBe(5);

  expect(score([1, 2, 3, 4, 5, 1])('12345')).toBe(6);

  expect(score([2, 2, 3, 4, 5, 1])('21345')).toBe(4);
});

function solution(answers) {
  const patterns = [
    '12345',
    '21232425',
    '3311224455',
  ];

  const scores = patterns.map(score(answers));

  const highestScore = Math.max(...scores);

  return scores
    .map((s, i) => [i + 1, s])
    .filter(([, s]) => s === highestScore)
    .map(([n]) => n)
    .sort((a, b) => a - b);
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

test('solution function exists', () => {
  expect(solution([1]));
});

test('given one problem', () => {
  expect(solution([1])).toEqual([1]);
  expect(solution([2])).toEqual([2]);
  expect(solution([3])).toEqual([3]);
});
