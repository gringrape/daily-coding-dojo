function nextIndex(name, current) {
  const distance = (i) => Math.min(
    Math.abs(i - current),
    Math.abs(name.length - i + current),
  );

  const [minEntry] = [...name]
    .map((c, i) => [c, i])
    .filter(([c]) => c !== 'A')
    .sort(([, i1], [, i2]) => distance(i1) - distance(i2));

  return minEntry[1];
}

describe('nextIndex', () => {
  test('moves to min', () => {
    expect(nextIndex('AB', 0)).toBe(1);
  });

  test('moves to min', () => {
    expect(nextIndex('AAB', 0)).toBe(2);
    expect(nextIndex('AABB', 0)).toBe(3);
  });
});

function sumOfLRDistances(name, sum = 0, current = 0) {
  const distance = (i) => Math.min(
    Math.abs(i - current),
    Math.abs(name.length - i + current),
  );

  if ([...name].every((c) => c === 'A')) {
    return sum;
  }

  const next = nextIndex(name, current);
  const nameArray = [...name];
  nameArray[next] = 'A';

  return sumOfLRDistances(nameArray.join(''), sum + distance(next), next);
}

describe('sumOfLRDistances', () => {
  test('moves to min', () => {
    expect(sumOfLRDistances('AAA')).toBe(0);
    expect(sumOfLRDistances('AAB')).toBe(1);
    expect(sumOfLRDistances('AABB')).toBe(2);
  });
});

const ALPHABET_LENGTH = 26;

function upDownDistance(character) {
  const code = (c) => c.charCodeAt(0);

  const distance = code(character) - code('A');

  return Math.min(distance, ALPHABET_LENGTH - distance);
}

function solution(name) {
  const sumOfUpDownDistances = [...name].map(upDownDistance).reduce((a, c) => a + c, 0);

  return sumOfUpDownDistances + sumOfLRDistances(name);
}

describe('solution', () => {
  test('test is working', () => {
    expect(1 + 1).toBe(2);
  });

  test('up button', () => {
    expect(solution('B')).toBe(1);
    expect(solution('C')).toBe(2);
    expect(solution('M')).toBe(12);
    expect(solution('N')).toBe(13);
  });

  test('down button', () => {
    expect(solution('Z')).toBe(1);
    expect(solution('O')).toBe(12);
  });

  test('right button', () => {
    expect(solution('BB')).toBe(3);
    expect(solution('BCD')).toBe(8);
  });

  test('greedy', () => {
    expect(solution('JAZ')).toBe(11);
  });
});
