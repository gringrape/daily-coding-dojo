test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(dartResult) {
  const parsed = dartResult
    .match(/(\d{1,2})([SDT])([*#]?)/g)
    .map((eachResult) => eachResult
      .split(/([^\d])/)
      .filter((i) => i));

  const scores = parsed
    .map(([score, range]) => score ** {
      S: 1,
      D: 2,
      T: 3,
    }[range]);

  const options = parsed
    .map(([,, option]) => option);

  options.forEach((option, i) => {
    if (option === '*') {
      scores[i] *= 2;
      scores[i - 1] *= 2;
    }

    if (option === '#') {
      scores[i] *= -1;
    }
  });

  return scores
    .reduce((a, c) => a + c, 0);
}

test('without option', () => {
  expect(solution('1S2D3T')).toBe(32);
  expect(solution('1D2S0T')).toBe(3);
  expect(solution('0D2S0T')).toBe(2);
});

test('with simple option', () => {
  expect(solution('1S2D*3T')).toBe(37);
  expect(solution('1D2S#10S')).toBe(9);
  expect(solution('1T2D3D#')).toBe(-4);
  expect(solution('1D2S3T*')).toBe(59);
});

test('with superposition of options', () => {
  expect(solution('1S*2T*3S')).toBe(23);
  expect(solution('1D#2S*3S')).toBe(5);
  expect(solution('1S*2S*3S*')).toBe(18);
});
