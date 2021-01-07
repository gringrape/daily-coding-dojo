/* eslint-disable no-restricted-syntax */
function* generateNumbers({ from, to }) {
  if (from > to) {
    return;
  }

  yield from;
  yield* generateNumbers({ from: from + 1, to });
}

function isPalindrome(text) {
  const middleIndex = Math.floor(text.length / 2);

  const iterator = generateNumbers({ from: 0, to: middleIndex + 1 });

  for (const i of iterator) {
    if (text[i] !== text[text.length - 1 - i]) {
      return false;
    }
  }

  return true;
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
