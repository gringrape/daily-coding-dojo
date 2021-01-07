function getComponents(str) {
  const excludeLast = (string) => string.slice(0, -1);
  const containsOnlyAlphabet = (string) => !string.match(/[^a-zA-Z]/);
  const makeWord = (_, i) => str.slice(i, i + 2);
  const toUpperCase = (string) => string.toUpperCase();

  return [...excludeLast(str)]
    .map(makeWord)
    .filter(containsOnlyAlphabet)
    .map(toUpperCase);
}
describe('getComponents', () => {
  test('alphabet', () => {
    expect(getComponents('AB')).toEqual(['AB']);
    expect(getComponents('ABC')).toEqual(['AB', 'BC']);
  });

  test('not alphabet', () => {
    expect(getComponents('A*')).toEqual([]);
  });

  test('have upper case', () => {
    expect(getComponents('Ab')).toEqual(['AB']);
  });
});

function calUnionAndIntersectionLength(str1, str2) {
  const [components1, components2] = [str1, str2].map(getComponents);

  const countPureComponents = (target, other) => (
    target.filter((component) => !other.includes(component))).length;
  const countSameComponents = (target, components) => (
    components.filter((component) => component === target)).length;
  const getIntersectionComponents = (comp1, comp2) => ([...new Set(
    comp1.filter((component) => comp2.includes(component)),
  )]);

  const [maxIntersection, minIntersection] = getIntersectionComponents(components1, components2)
    .map((component) => [
      countSameComponents(component, components1),
      countSameComponents(component, components2),
    ])
    .map((counts) => [Math.max(...counts), Math.min(...counts)])
    .reduce((acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]], [0, 0]);

  return [
    countPureComponents(components1, components2)
    + countPureComponents(components2, components1)
    + maxIntersection,
    minIntersection,
  ];
}

test('calUnionAndIntersectionLength', () => {
  expect(calUnionAndIntersectionLength('AB', 'AB')).toEqual([1, 1]);
  expect(calUnionAndIntersectionLength('AB', 'ABB')).toEqual([2, 1]);
  expect(calUnionAndIntersectionLength('AA', 'AAAAAAA')).toEqual([6, 1]);
  expect(calUnionAndIntersectionLength('BBBBBB', 'BB')).toEqual([5, 1]);
});

function solution(str1, str2) {
  const [unionLength, intersectionLength] = calUnionAndIntersectionLength(str1, str2);

  return Math.floor(65536 * (
    unionLength
      ? intersectionLength / unionLength
      : 1
  ));
}

describe('solution', () => {
  test('simple', () => {
    expect(solution('AB', 'AB')).toBe(65536);
    expect(solution('AB', 'ABC')).toBe(Math.floor(65536 * 0.5));
  });

  test('case insensitive', () => {
    expect(solution('AB', 'aB')).toBe(65536);
  });

  test('blank', () => {
    expect(solution('handshake', 'shake hands')).toBe(65536);
  });

  test('both are not alphabet', () => {
    expect(solution('E=M*C^2', 'e=m*c^2')).toBe(65536);
  });

  test('one is not alphabet', () => {
    expect(solution('AA', 'e=m*c^2')).toBe(0);
  });

  test('intersection', () => {
    expect(solution('aa1+aa2+aa3', 'AAA12')).toBe(43690);
  });

  test('sample', () => {
    expect(solution('FRANCE', 'french')).toBe(16384);
    expect(solution('aa1+aa2', 'AAAA12')).toBe(43690);
  });
});
