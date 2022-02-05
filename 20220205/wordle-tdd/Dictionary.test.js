import Dictionary from './Dictionary';

import Word from './Word';

describe('Dictionary', () => {
  it('counts included words', () => {
    const dictionary = new Dictionary([new Word('valid')]);

    expect(dictionary.wordsCount()).toBe(1);
  });

  it('checks if included word', () => {
    const dictionary = new Dictionary([new Word('valid')]);

    expect(dictionary.includes(new Word('valid'))).toBe(true);
    expect(dictionary.includes(new Word('sadly'))).toBe(false);
  });
});
