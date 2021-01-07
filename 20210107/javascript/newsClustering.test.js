const containsExceptional = (str) => str.match(/[^A-Za-z]/);

test('containsExceptional', () => {
  expect(containsExceptional(' ')).toBeTruthy();
  expect(containsExceptional('#')).toBeTruthy();

  expect(containsExceptional('abc')).toBeFalsy();
});

function getComponents(str) {
  return [...str]
    .slice(0, -1)
    .map((char, i) => char.concat(str[i + 1]))
    .map((el) => el.toUpperCase())
    .filter((el) => !containsExceptional(el));
}

function solution(str1, str2) {
  const componentsOfStr1 = getComponents(str1);
  const componentsOfStr2 = getComponents(str2);

  if (componentsOfStr1.length === 0 && componentsOfStr2.length === 0) {
    return 65536;
  }

  const commonComponents = [...new Set(componentsOfStr1
    .filter((component) => componentsOfStr2.includes(component)))];

  const intersection = commonComponents.flatMap((el) => {
    const countStr1 = componentsOfStr1.filter((element) => element === el).length;
    const countStr2 = componentsOfStr2.filter((element) => element === el).length;
    return Array(Math.min(countStr2, countStr1)).fill(el);
  });

  const pureComponentsOfStr2NotSame = componentsOfStr2
    .filter((component) => !intersection.includes(component));

  const pureComponentsOfStr2Same = [...new Set(componentsOfStr2
    .filter((component) => intersection.includes(component)))]
    .flatMap((el) => {
      const countIntersection = intersection.filter((element) => element === el).length;
      const countStr2 = componentsOfStr2.filter((element) => element === el).length;

      if (countIntersection >= countStr2) {
        return [];
      }

      return Array(countStr2 - countIntersection).fill(el);
    });

  const union = [
    ...componentsOfStr1,
    ...pureComponentsOfStr2Same,
    ...pureComponentsOfStr2NotSame,
  ];

  return Math.floor((intersection.length / union.length) * 65536);
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
