function isPalindrome(text) {
  const middleIndex = Math.floor(text.length / 2);
  return Array(middleIndex).fill()
    .map((_, index) => index)
    .every((index) => text[index] === text[text.length - 1 - index]);
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
