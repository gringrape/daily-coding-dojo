function reverse(string) {
  return string.split('').reverse().join('');
}

test('reverse', () => {
  expect(reverse('ab')).toBe('ba');
  expect(reverse('abc')).toBe('cba');
});
