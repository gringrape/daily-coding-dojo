function isPalindrome(text, start = 0, end = text.length - 1) {
  if (start >= end) {
    return true;
  }

  return text[start] === text[end] && isPalindrome(text, start + 1, end - 1);
}

test('true', () => {
  expect(isPalindrome('a')).toBeTruthy();
  expect(isPalindrome('rotator')).toBeTruthy();
  expect(isPalindrome('aba')).toBeTruthy();
  expect(isPalindrome('abbbbbba')).toBeTruthy();
  expect(isPalindrome('tattarrattat')).toBeTruthy();
  expect(isPalindrome('thisisverynicewowawesomehellohiwowowowihollehemosewawowecinyrevsisiht')).toBeTruthy();
});

test('false', () => {
  expect(isPalindrome('ab')).toBeFalsy();
  expect(isPalindrome('deoksu')).toBeFalsy();
  expect(isPalindrome('thisisverynicewowawesomehellohiwowowowihollehemosewawowecinyrevsisihthh')).toBeFalsy();
});
