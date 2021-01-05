function isPalindrome(text) {
  const middleIndex = Math.floor(text.length / 2);
  return [...Array(middleIndex).keys()]
    .every((idx) => text[idx] === text[text.length - 1 - idx]);
}

test('sample', () => {
  expect(isPalindrome('a')).toBeTruthy();
  expect(isPalindrome('ab')).toBeFalsy();
  expect(isPalindrome('aba')).toBeTruthy();
  expect(isPalindrome('rotator')).toBeTruthy();
  expect(isPalindrome('deoksu')).toBeFalsy();
  expect(isPalindrome('abbbbbba')).toBeTruthy();
  expect(isPalindrome('tattarrattat')).toBeTruthy();
  expect(isPalindrome('thisisverynicewowawesomehellohiwowowowihollehemosewawowecinyrevsisiht')).toBeTruthy();
  expect(isPalindrome('thisisverynicewowawesomehellohiwowowowihollehemosewawowecinyrevsisihthh')).toBeFalsy();
});
