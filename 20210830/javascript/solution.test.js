function range(start, end) {
  return [...Array(end - start)].map((_, i) => i + start);
}

function sum(array) {
  return array.reduce((a, c) => a + c, 0);
}

function solution(word) {
  const letters = 'AEIOU';

  const unit = (i) => sum(
    range(0, i).map((k) => 5 ** k),
  );

  return sum(
    [...word].map((l, i) => (
      letters.indexOf(l) * unit(5 - i) + 1
    )),
  );
}

test('a letter', () => {
  expect(solution('A')).toBe(1);
  expect(solution('I')).toBe(1563);
});

test('two letters', () => {
  expect(solution('AA')).toBe(2);
  expect(solution('IA')).toBe(1564);
});

test('sample', () => {
  expect(solution('AAAAE')).toBe(6);
  expect(solution('AAAE')).toBe(10);
  expect(solution('EIO')).toBe(1189);
});
