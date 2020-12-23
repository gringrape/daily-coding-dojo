function transform(s) {
  const result = [...s].filter((el) => el !== '0');
  return [s.length - result.length, result.length.toString(2)];
}

test('transform', () => {
  expect(transform('10')).toEqual([1, '1']);
  expect(transform('110')).toEqual([1, '10']);
  expect(transform('110010101001')).toEqual([6, '110']);
});

function transformIterative(str, count = 0, zeroCount = 0) {
  if (str === '1') {
    return [count, zeroCount];
  }

  const [zeroCountPlus, result] = transform(str);

  return transformIterative(result, count + 1, zeroCount + zeroCountPlus);
}

test('transformIterative', () => {
  expect(transformIterative('110010101001')).toEqual([3, 8]);
});
