function fac(n, acc = 1) {
  if (n === 1) {
    return acc;
  }

  return fac(n - 1, acc * n);
}

test('factorial', () => {
  expect(fac(1)).toBe(1);
  expect(fac(2)).toBe(2);
  expect(fac(3)).toBe(6);
});
