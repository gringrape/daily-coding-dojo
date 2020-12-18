function countDaysToComplete(progresses, speeds) {
  return progresses
    .map((progress, idx) => (100 - progress) / speeds[idx])
    .map(Math.ceil);
}

test('countDays', () => {
  expect(countDaysToComplete([95, 30], [2, 30])).toEqual([3, 3]);
  expect(countDaysToComplete([93, 30, 55], [1, 30, 5])).toEqual([7, 3, 9]);
});

function determineDeployDays(daysToComplete, deployDay = daysToComplete[0]) {
  if (daysToComplete.length === 0) {
    return [];
  }
  const currentDayToComplete = daysToComplete[0];

  return (deployDay > currentDayToComplete)
    ? [deployDay, ...determineDeployDays(daysToComplete.slice(1), deployDay)]
    : [currentDayToComplete, ...determineDeployDays(daysToComplete.slice(1), currentDayToComplete)];
}

test('determineDeployDays', () => {
  expect(determineDeployDays([5, 2, 7])).toEqual([5, 5, 7]);
  expect(determineDeployDays([1, 6, 1, 5, 8])).toEqual([1, 6, 6, 6, 8]);
});

function countFeaturesOnDeploys(deployDays) {
  return deployDays.reduce((counts, deployDay) => ({
    ...counts,
    [deployDay]: (counts[deployDay] || 0) + 1,
  }), {});
}
test('countFeaturesOnDeploys', () => {
  expect(countFeaturesOnDeploys([5, 6, 6])).toEqual({
    5: 1,
    6: 2,
  });
  expect(countFeaturesOnDeploys([1, 2, 2, 5, 5])).toEqual({
    1: 1,
    2: 2,
    5: 2,
  });
});

function solution(progresses, speeds) {
  return [
    determineDeployDays,
    countFeaturesOnDeploys,
    Object.values,
  ].reduce((result, f) => f(result), countDaysToComplete(progresses, speeds));
}

test('solution', () => {
  expect(solution([93, 39, 55], [1, 30, 5])).toEqual([2, 1]);
  expect(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])).toEqual([1, 3, 2]);
});
