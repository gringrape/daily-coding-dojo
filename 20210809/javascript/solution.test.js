function gradeOf(score) {
  const grades = ['A', 'B', 'C', 'D', 'F'];
  const gradeToMinScore = {
    A: 90, B: 80, C: 70, D: 50, F: 0,
  };

  return grades.find((grade) => score >= gradeToMinScore[grade]);
}

function transpose(array) {
  const { length: columns } = array[0];

  return [...Array(columns)]
    .map((_, i) => array.map((row) => row[i]));
}

test('transpose', () => {
  expect(transpose([
    [1, 2],
    [3, 4],
  ])).toEqual([
    [1, 3],
    [2, 4],
  ]);
});

function average(scores, i) {
  const calculate = (array) => array.reduce((a, b) => a + b, 0) / array.length;

  const myScore = scores[i];

  const condition1 = scores.filter((score) => score === myScore).length === 1;
  const condition2 = Math.max(...scores) === myScore;
  const condition3 = Math.min(...scores) === myScore;

  if (condition1 && (condition2 || condition3)) {
    return calculate([...scores.slice(0, i), ...scores.slice(i + 1)]);
  }

  return calculate(scores);
}

function solution(scores) {
  return transpose(scores)
    .map((eachStudent, i) => average(eachStudent, i))
    .map(gradeOf).join('');
}

test('sample', () => {
  expect(solution([
    [100, 90, 98, 88, 65],
    [50, 45, 99, 85, 77],
    [47, 88, 95, 80, 67],
    [61, 57, 100, 80, 65],
    [24, 90, 94, 75, 65],
  ])).toBe('FBABD');
});
