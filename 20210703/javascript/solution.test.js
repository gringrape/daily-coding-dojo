test('test works', () => {
  expect(1 + 1).toBe(2);
});

function range(from, to) {
  if (from >= to) {
    return [];
  }
  return Array(to - from).fill().map((_, i) => i + from);
}

function solution(s) {
  if (s.length === 1) {
    return 1;
  }

  if (s.length === 2) {
    return s[0] === s[1] ? 2 : 0;
  }

  const N = s.length;
  const d = Array(N).fill(0)
    .map(() => Array(N).fill(-1));

  range(0, N).forEach((i) => {
    d[i][i] = 1;
    d[i][i + 1] = s[i] === s[i + 1] ? 2 : 0;
  });

  range(2, N).forEach((j) => {
    range(0, N - 1).forEach((i) => {
      if (i + j <= N - 1) {
        d[i][i + j] = d[i + 1][i + j - 1] + (s[i] === s[i + j] ? 2 : 0);
      }
    });
  });

  return Math.max(...d.flat());
}

test('simple', () => {
  expect(solution('a')).toBe(1);
  expect(solution('ab')).toBe(0);
  expect(solution('aa')).toBe(2);
});

test('longer than 2', () => {
  expect(solution('aba')).toBe(3);
  expect(solution('aaa')).toBe(3);
  expect(solution('aab')).toBe(2);
  expect(solution('abc')).toBe(1);
});

test('sample', () => {
  expect(solution('abcdcba')).toBe(7);
  expect(solution('abacde')).toBe(3);
});
