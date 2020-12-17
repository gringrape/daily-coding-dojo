function transbaseToArray({ number, base }) {
  if (number < base) {
    return [number];
  }

  const nextNum = Math.round(Math.floor(number / base));

  return [
    ...transbaseToArray({ number: nextNum, base: 3 }),
    number % base,
  ];
}

function arrayToTenBaseNumber({ array, base }) {
  return array.reduce((acc, num, idx) => acc + num * base ** idx, 0);
}

test('arrayToTenBaseNumber', () => {
  expect(arrayToTenBaseNumber({
    array: [0, 1, 1],
    base: 3,
  })).toBe(12);
});

// 3 진법 바꾸기
test('transbase', () => {
  expect(transbaseToArray({
    number: 1,
    base: 3,
  })).toEqual([1]);

  expect(transbaseToArray({
    number: 2,
    base: 3,
  })).toEqual([2]);

  expect(transbaseToArray({
    number: 3,
    base: 3,
  })).toEqual([1, 0]);

  expect(transbaseToArray({
    number: 5,
    base: 3,
  })).toEqual([1, 2]);

  expect(transbaseToArray({
    number: 5,
    base: 3,
  })).toEqual([1, 2]);

  expect(transbaseToArray({
    number: 28,
    base: 3,
  })).toEqual([1, 0, 0, 1]);

  expect(transbaseToArray({
    number: 577,
    base: 3,
  })).toEqual([2, 1, 0, 1, 0, 1]);
});