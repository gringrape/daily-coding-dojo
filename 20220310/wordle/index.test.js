/*
* word는 5글자를 가진다. -> o.k.
* word list에 word가 있는지 체크한다. -> o.k.
* */

const Word = require('./Word');
const WordList = require('./WordList');
const Game = require('./Game');

const context = describe;

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

  // 회고
  // 동우님
  // - 용어 정리가 중요하다.
  // - 다른 파트 와의 의사소통뿐 아니라, 개발할때도 용어를 잘 정의해놓는것이 중요하다고 느꼈다.
  // - 도메인에 대한 이해가 정말 중요할 것 같다.
  // - 기록을 잘 해두니깐 다음 스텝으로 넘어갈 수 있었다.
  // 덕수님
  // - 온전히 이름 짓기에 대해서 생각할 수 있는 시간이 너무 좋았다.
  // - 용어에 대한 싱크를 맞춰놓으니 확실히 다음 스텝이 자연스럽게 진행되었다.
  // - 프로그래머의 뇌에서 어려운 문제를 풀려면 쉬운 문제들을 자동화해라라는 말이 있었다.
  // 넥스트 스텝으로 넘어가기 위한 것과 비슷한 맥락인 것 같다.

  /**
   * findGreenPositionsFor() {}
   * findYellowPositionsFor() {}
   * findGrayPositionsFor() {}
 */
  context('answer 의 position letter와 guess 의 position letter가 일치하면', () => {
    test('guess 에서 해당 letter들의 position들을 반환한다.', () => {
      const answer = new Word('apple');

      const game = new Game(answer);

      expect(game.findGreenPositionsFor(new Word('axxoo'))).toEqual([0]);
      expect(game.findGreenPositionsFor(new Word('apxoo'))).toEqual([0, 1]);
      expect(game.findGreenPositionsFor(new Word('appoe'))).toEqual([0, 1, 2, 4]);
    });
  });
});
