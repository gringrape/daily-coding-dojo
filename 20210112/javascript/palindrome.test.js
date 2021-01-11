function isPalindrome(t) {
  const go = (l, r, a) => ((l > r)
    ? a
    : go(l + 1, r - 1, a && t[l] === t[r]));

  return go(0, t.length - 1, true);
}

test('true', () => {
  expect(isPalindrome('a')).toBeTruthy();
  expect(isPalindrome('aa')).toBeTruthy();
  expect(isPalindrome('aba')).toBeTruthy();
  expect(isPalindrome('abba')).toBeTruthy();
});

test('false', () => {
  expect(isPalindrome('ab')).toBeFalsy();
  expect(isPalindrome('abaa')).toBeFalsy();
});
