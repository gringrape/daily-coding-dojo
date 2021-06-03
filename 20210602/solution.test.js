function solution(n, words) {
  const dropout = words.findIndex((word, i, a) => {
    const previousWords = a.slice(0, i);
    const leftWord = previousWords[previousWords.length - 1];

    return word.length === 1
    || previousWords.includes(word)
    || (leftWord && !leftWord.endsWith(word[0]));
  });

  return [(dropout % n) + 1, Math.floor(dropout / n) + 1];
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

describe('solution', () => {
  it('exists', () => {
    expect(solution(2, ['hello']));
  });

  context('with one letter word', () => {
    it('returns dropout', () => {
      expect(solution(2, ['hello', 'o'])).toEqual([2, 1]);
    });
  });

  context('with repetitive word', () => {
    it('returns dropout', () => {
      expect(solution(2, ['oreo', 'oreo'])).toEqual([2, 1]);
    });
  });

  context('with word not following preceding word', () => {
    it('returns dropout', () => {
      expect(solution(2, ['hello', 'bye'])).toEqual([2, 1]);
    });
  });

  context('with 2 or more cycle', () => {
    it('returns dropout', () => {
      expect(solution(2, ['hello', 'oreo', 'hero'])).toEqual([1, 2]);
    });
  });
});
