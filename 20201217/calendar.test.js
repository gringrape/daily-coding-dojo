const monthDays = [
  31, 29, 31, 30, 31, 30, 
  31, 31, 30, 31, 30, 31,
];

function countDays(month, day) {
  const sumMonthDays = monthDays
    .filter((_, idx) => idx + 1 < month)
    .reduce((acc, curr) => acc + curr, 0);

  return sumMonthDays + day - 1;
}

test('countDays', () => {
  expect(countDays(1, 2)).toBe(1);  
  expect(countDays(1, 30)).toBe(29);
  expect(countDays(2, 1)).toBe(31);
  expect(countDays(3, 1)).toBe(60);
  expect(countDays(10, 26)).toBe(299);
});

const daysOfWeek = [
  'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',
];

function solution(month, day) {
  const indexCount = (countDays(month, day) + 4) % 7;
  return daysOfWeek[indexCount];
}

test('solution', () => {
  expect(solution(1, 2)).toBe('SAT');
  expect(solution(1, 3)).toBe('SUN');
  expect(solution(1, 4)).toBe('MON');
  expect(solution(1, 11)).toBe('MON');
  expect(solution(1, 30)).toBe('SAT');
  expect(solution(2, 1)).toBe('MON');
  expect(solution(5, 24)).toBe('TUE');
});
