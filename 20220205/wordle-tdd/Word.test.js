import Word from './Word';

describe('Word', () => {
  test('A word is a valid 5 letter word', () => {
    const word = new Word('valid');

    expect(word.letters()).toEqual(['v', 'a', 'l', 'i', 'd']);
  });

  describe('with more or less than 5 letters', () => {
    const LONG_WORD = 'too long';
    const SHORT_WORD = 'shor';
    const EMPTY_WORD = '';

    it('raises error', () => {
      [LONG_WORD, SHORT_WORD, EMPTY_WORD].forEach((word) => {
        expect(() => new Word(word)).toThrow('Word must be 5 letters');
      });
    });
  });

  describe('with invalid characters', () => {
    it('raise error', () => {
      expect(() => new Word('va*id')).toThrow('Word contains invalid characters');
      expect(() => new Word('v^^id')).toThrow('Word contains invalid characters');
    });
  });

  test('equality', () => {
    expect(new Word('happy').equals(new Word('happy'))).toBe(true);
    expect(new Word('happy').equals(new Word('sadly'))).toBe(false);
  });

  test('matchesPositionWith', () => {
    const word = new Word('happy');

    expect(word.matchesPositionWith(new Word('kello'))).toEqual([]);
    expect(word.matchesPositionWith(new Word('hepkk'))).toEqual([0, 2]);
    expect(word.matchesPositionWith(new Word('happy'))).toEqual([0, 1, 2, 3, 4]);
  });

  test('matchesIncorrectPositionWith', () => {
    const word = new Word('happy');

    expect(word.matchesIncorrectPositionWith(new Word('xello'))).toEqual([]);
    expect(word.matchesIncorrectPositionWith(new Word('yello'))).toEqual([0]);
    expect(word.matchesIncorrectPositionWith(new Word('ypaoo'))).toEqual([0, 1, 2]);
  });
});
