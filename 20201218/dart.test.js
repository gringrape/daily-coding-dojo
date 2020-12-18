function divideIntoParts(results) {
  return results.match(/\d+[^\d]+/g);
}

test('divideIntoParts', () => {
  expect(divideIntoParts('1S2D*3T')).toEqual([
    '1S',
    '2D*',
    '3T',
  ]);
  expect(divideIntoParts('10D2S#10S')).toEqual([
    '10D',
    '2S#',
    '10S',
  ]);
});

function divideResultIntoParts(result) {
  const [score, bonusAndOption] = result.split(/(\d+)/)
    .filter((s) => s);

  const [bonus, option] = bonusAndOption.split('');

  return {
    score: parseInt(score, 10),
    bonus,
    option: option || '',
  };
}

test('divideResultIntoParts', () => {
  expect(divideResultIntoParts('1S')).toEqual({
    score: 1,
    bonus: 'S',
    option: '',
  });
  expect(divideResultIntoParts('2S#')).toEqual({
    score: 2,
    bonus: 'S',
    option: '#',
  });
  expect(divideResultIntoParts('10S*')).toEqual({
    score: 10,
    bonus: 'S',
    option: '*',
  });
});

function applyBouns(scores, bonuses) {
  const bonusToExp = {
    S: 1,
    D: 2,
    T: 3,
  };

  return scores.map((score, idx) => score ** bonusToExp[bonuses[idx]]);
}

test('applyBonuses', () => {
  expect(applyBouns([1, 2, 3], ['S', 'D', 'T'])).toEqual([1, 4, 27]);
  expect(applyBouns([5, 2, 4], ['S', 'D', 'T'])).toEqual([5, 4, 64]);
});

function applyOption(scores, options, currIndex = 0) {
  if (currIndex === scores.length) {
    return scores;
  }

  const optionToEffect = {
    '#': (score, prevScore) => [-1 * score, prevScore],
    '*': (score, prevScore = 0) => [2 * score, 2 * prevScore],
    '': (score, prevScore) => [score, prevScore],
  };

  const [newScore, prevScore] = optionToEffect[
    options[currIndex]](scores[currIndex], scores[currIndex - 1]);

  const newScores = scores.map((el, idx) => {
    if (idx === currIndex) {
      return newScore;
    }
    if (idx === currIndex - 1) {
      return prevScore;
    }
    return el;
  });

  return applyOption(newScores, options, currIndex + 1);
}

test('applyBonuses', () => {
  expect(applyOption([1, 2, 3], ['', '#', ''])).toEqual([1, -2, 3]);
  expect(applyOption([1, 2, 2], ['', '*', ''])).toEqual([2, 4, 2]);
  expect(applyOption([1, 2, 2], ['*', '*', ''])).toEqual([4, 4, 2]);
});

function solution(str) {
  const results = divideIntoParts(str).map(divideResultIntoParts);

  const scores = results.map((result) => result.score);
  const options = results.map((result) => result.option);
  const bonuses = results.map((result) => result.bonus);

  const bonusApplied = applyBouns(scores, bonuses);
  const optionApplied = applyOption(bonusApplied, options);

  return optionApplied.reduce((acc, curr) => acc + curr, 0);
}

test('applyBonuses', () => {
  expect(solution('1S2D*3T')).toEqual(37);
});
