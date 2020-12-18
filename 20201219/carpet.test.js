function* heightGenerator(n, height = 1) {
  if (n / height < height) {
    return;
  }

  if (n % height === 0) {
    yield height;
  }

  yield* heightGenerator(n, height + 1);
}

test('heightGenerator', () => {
  expect([...heightGenerator(24)]).toEqual([1, 2, 3, 4]);
  expect([...heightGenerator(36)]).toEqual([1, 2, 3, 4, 6]);
  expect([...heightGenerator(100)]).toEqual([1, 2, 4, 5, 10]);
});

function calculateEntireArea(yellowWidth, yellowHeight) {
  return (yellowWidth + 2) * (yellowHeight + 2);
}

test('calculateEntireArea', () => {
  expect(calculateEntireArea(5, 5)).toBe(49);
});

function solution(brown, yellow, yellowHeightIt = heightGenerator(yellow)) {
  const yellowHeight = yellowHeightIt.next().value;
  const yellowWidth = yellow / yellowHeight;
  const totalArea = calculateEntireArea(yellowWidth, yellowHeight);

  if (brown === totalArea - yellow) {
    return [yellowWidth + 2, yellowHeight + 2];
  }

  return solution(brown, yellow, yellowHeightIt);
}

test('solution', () => {
  expect(solution(10, 2)).toEqual([4, 3]);
});
