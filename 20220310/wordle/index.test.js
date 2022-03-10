/*
* word는 5글자를 가진다. -> o.k.
* word list에 word가 있는지 체크한다. -> o.k.
*
* */

const Word = require('./Word');
const WordList = require('./WordList');
const Game = require('./Game');

describe('wordle', () => {
  test('word has five letters', () => {
    expect(() => new Word('app')).toThrow('5글자여야만 합니다.');
    expect(new Word('apple')).toBeDefined();
  });

  test('check if the word is in the word list.', () => {
    const dictionary = [
      'apple', 'mango', 'jelly',
    ];

    const wordList = new WordList(dictionary);

    expect(wordList.include(new Word('apple'))).toBeTruthy();
    expect(wordList.include(new Word('abcde'))).toBeFalsy();
  });

  // 의도적으로 작은 보폭으로 접근해보려고 했으나
  // 비효율적인 코드들이 작성되었음.
  // 항상 너무 작은 보폭을 생각하는 것도 좋지 못한 것 같음.
  test('tells the position of correct letters', () => {
    const answer = new Word('apple');

    const game = new Game(answer);

    expect(game.checkCorrect(new Word('axxoo'))).toEqual([0]);
    expect(game.checkCorrect(new Word('apxoo'))).toEqual([0, 1]);
  });
});
