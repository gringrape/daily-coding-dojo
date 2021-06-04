/* eslint-disable prefer-const */
function deletePair(string) {
  return string.replace(/([a-z])\1{1}/, '');
}

test('deletePair', () => {
  expect(deletePair('abba')).toBe('aa');
  expect(deletePair('abccba')).toBe('abba');
  expect(deletePair('aabbcc')).toBe('bbcc');
});

test('deletePair - no pair found', () => {
  expect(deletePair('abcba')).toBe('abcba');
});

function solution(string) {
  // 재귀 방법을 사용하면 스택이 꽉차게 되는 문제가 있어 반복문을 활용
  // function go(previous) {
  //   if (!previous) {
  //     return 1;
  //   }

  //   const current = deletePair(previous);

  //   if (current === previous) {
  //     return 0;
  //   }

  //   return go(current);
  // }

  // return go(string);
  let previous = string;
  let current = '';

  while (true) {
    if (!previous) {
      return 1;
    }

    current = deletePair(previous);

    if (current === previous) {
      return 0;
    }

    previous = current;
  }
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

test('solution function exists', () => {
  expect(solution('aa'));
});

describe('solution', () => {
  context('with possible string', () => {
    it('returns 1', () => {
      expect(solution('aa')).toBe(1);
    });
  });

  context('with impossible string', () => {
    it('returns 0', () => {
      expect(solution('ab')).toBe(0);
    });
  });

  context('with possible string longer than 2 letters', () => {
    it('returns 1', () => {
      expect(solution('abba')).toBe(1);
    });
  });
});
