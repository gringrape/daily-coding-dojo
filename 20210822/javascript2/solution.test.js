function solution(grades) {
  const gradeTypes = [
    'A+', 'A0', 'A-',
    'B+', 'B0', 'B-',
    'C+', 'C0', 'C-',
    'D+', 'D0', 'D-',
    'F'];

  const gradeTable = Object.fromEntries(gradeTypes.map((score, i) => [score, 13 - i]));

  const scores = {};

  grades.forEach((grade, i) => {
    const [name, score] = grade.split(' ');

    if (!scores[name] || gradeTable[scores[name][0]] < gradeTable[score]) {
      scores[name] = [score, i];
    }
  });

  return Object.entries(scores)
    .sort(([, [, i1]], [, [, i2]]) => i1 - i2)
    .sort(([, [a1]], [, [a2]]) => gradeTable[a2] - gradeTable[a1])
    .map(([k, [a]]) => `${k} ${a}`);
}

test('best', () => {
  expect(solution([
    'DS7651 A0',
    'DS7651 A+',
    'DS7651 C0',
  ])).toEqual(['DS7651 A+']);
});

test('sample', () => {
  expect(solution(['DS7651 A0', 'CA0055 D+', 'AI5543 C0', 'OS1808 B-', 'DS7651 B+', 'AI0001 F', 'DB0001 B-', 'AI5543 D+', 'DS7651 A+', 'OS1808 B-']))
    .toEqual(['DS7651 A+', 'OS1808 B-', 'DB0001 B-', 'AI5543 C0', 'CA0055 D+', 'AI0001 F']);
});

test('sample2', () => {
  expect(solution(['DM0106 D-', 'PL6677 B+', 'DM0106 B+', 'DM0106 B+', 'PL6677 C0', 'GP0000 A0']))
    .toEqual(['GP0000 A0', 'PL6677 B+', 'DM0106 B+']);
});
