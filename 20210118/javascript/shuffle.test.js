function shuffle(array) {
  const n = array.length / 2;
  return Array(2 * n).fill()
    .map((_, i) => ((i % 2 === 0) ? array[i / 2] : array[(i - 1) / 2 + n]));
}

test('simple', () => {
  // expect(shuffle([1, 2])).toEqual([1, 2]);
  expect(shuffle([1, 2, 3, 4])).toEqual([1, 3, 2, 4]);
});
