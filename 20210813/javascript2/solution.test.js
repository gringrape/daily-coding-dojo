function zip(array1, array2) {
  return array1.map((a1, i) => [a1, array2[i]]);
}

function deploy(days) {
  const [max] = days;
  const next = days.findIndex((day) => day > max);

  if (next === -1) {
    return [days.length];
  }

  return [next, ...deploy(days.slice(next))];
}

describe('deploy', () => {
  test('one deploy', () => {
    expect(deploy([5, 1, 1, 1])).toEqual([4]);
    expect(deploy([5, 1, 1])).toEqual([3]);
  });

  test('two or more deploies', () => {
    expect(deploy([5, 1, 1, 6, 2])).toEqual([3, 2]);
  });
});

function solution(progresses, speeds) {
  const days = zip(progresses, speeds)
    .map(([progress, speed]) => Math.ceil((100 - progress) / speed));

  return deploy(days);
}

test('sample', () => {
  expect(solution(
    [93, 30, 55],
    [1, 30, 5],
  )).toEqual([2, 1]);
});
