test('test works', () => {
  expect(1 + 1).toBe(2);
});

function daysFromJanuaryFirst(a, b) {
  const monthsDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 30, 31];

  return monthsDays
    .slice(0, a - 1)
    .reduce((acc, c) => acc + c, b - 1);
}

describe('daysFromJanuaryFirst', () => {
  test('with same month', () => {
    expect(daysFromJanuaryFirst(1, 2)).toBe(1);
    expect(daysFromJanuaryFirst(1, 31)).toBe(30);
  });

  test('with another month', () => {
    expect(daysFromJanuaryFirst(2, 1)).toBe(31);
    expect(daysFromJanuaryFirst(2, 29)).toBe(59);
    expect(daysFromJanuaryFirst(3, 1)).toBe(60);
  });
});

function solution(a, b) {
  const WEEK_DAYS = [
    'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',
  ];

  return WEEK_DAYS[(daysFromJanuaryFirst(a, b) + WEEK_DAYS.indexOf('FRI')) % 7];
}

test('samples', () => {
  expect(solution(5, 24)).toBe('TUE');
});
