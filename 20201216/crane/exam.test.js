// 모의고사
const patterns = {
  1: '12345',
  2: '21232425',
  3: '3311224455',
};

function makeMyAnswers({ pattern, quantity }) {
  return Array(quantity)
    .fill(0)
    .map((_, idx) => pattern[idx % pattern.length])
    .map((numString) => Number.parseInt(numString, 10));
}

function getScore({ student, answers }) {
  const myAnswers = makeMyAnswers({
    pattern: patterns[student],
    quantity: answers.length,    
  });
  
  return answers
    .filter((_, idx) => answers[idx] === myAnswers[idx])
    .length;
}

function getWinner(answers) {
  const scoreEntries = Object.keys(patterns)
    .map(([student]) => [student, getScore({ student, answers })]);
  const scores = scoreEntries.map(([, score]) => score);

  return scoreEntries
    .filter(([_, score]) => score === Math.max(...scores))
    .map(([student, _]) => parseInt(student, 10))
    .sort((a, b) => a - b);
}


test('getWinner', () => {
  expect(getWinner([1, 2, 3, 4, 5])).toEqual([1]);
  expect(getWinner([1, 3, 2, 4, 2])).toEqual([1, 2, 3]);
});

test('getScore', () => {
  expect(getScore({
    student: 2,
    answers: [1, 2, 3, 4, 5],
  })).toBe(0);
  
  expect(getScore({
    student: 1,
    answers: [1, 2, 3, 4, 5],
  })).toBe(5);

  expect(getScore({
    student: 3,
    answers: [1, 2, 3, 4, 5],
  })).toBe(0);
});

test('makeMyAnswers', () => {
  expect(makeMyAnswers({
    pattern: '12345',
    quantity: 8,
  })).toEqual([1, 2, 3, 4, 5, 1, 2, 3]);
});