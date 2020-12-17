function changeToThreeBaseArray(number) {
  if (number < 3) {
    return [number];
  }

  return [
    ...changeToThreeBaseArray(Math.floor(number / 3)), 
    number % 3,
  ];
}

test('changeToThreeBaseArray', () => {
  expect(changeToThreeBaseArray(1)).toEqual([1]);
  expect(changeToThreeBaseArray(3)).toEqual([1, 0]);
  expect(changeToThreeBaseArray(5)).toEqual([1, 2]);
  expect(changeToThreeBaseArray(9)).toEqual([1, 0, 0]);
  expect(changeToThreeBaseArray(28)).toEqual([1, 0, 0, 1]);
  expect(changeToThreeBaseArray(83)).toEqual([1, 0, 0, 0, 2]);
});

// 제너레이터 + 재귀
function* threeBaseGenerator(number) {
  if (number < 3) {
    yield number;
    return;
  }

  yield number % 3;
  yield* threeBaseGenerator(Math.floor(number / 3));
}

test('changeToThreeBaseArray', () => {
  expect([...threeBaseGenerator(1)].reverse()).toEqual([1]);
  expect([...threeBaseGenerator(3)].reverse()).toEqual([1, 0]);
  expect([...threeBaseGenerator(5)].reverse()).toEqual([1, 2]);
  expect([...threeBaseGenerator(9)].reverse()).toEqual([1, 0, 0]);
  expect([...threeBaseGenerator(28)].reverse()).toEqual([1, 0, 0, 1]);
  expect([...threeBaseGenerator(83)].reverse()).toEqual([1, 0, 0, 0, 2]);
});

function changeToTenBaseNumber(arr) {
  return arr.reverse().reduce((acc, number, idx) => acc + number * Math.pow(3, idx), 0);
}

test('changeToTenBaseNumber', () => {
  expect(changeToTenBaseNumber([1])).toBe(1);
  expect(changeToTenBaseNumber([2])).toBe(2);
  expect(changeToTenBaseNumber([1, 0])).toBe(3);
  expect(changeToTenBaseNumber([1, 0, 0, 1])).toBe(28);
});

function solution(number) {
  const transformed = [...threeBaseGenerator(number)];
  return changeToTenBaseNumber(transformed);
}

test('changeToTenBaseNumber', () => {
  expect(solution(45)).toBe(7);
  expect(solution(125)).toBe(229);
});
