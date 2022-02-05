import Game from './Game';

import Word from './Word';
import Dictionary from './Dictionary';

describe('Game', () => {
  let game;
  const winnerWord = new Word('happy');

  beforeEach(() => {
    const words = [new Word('hello'), new Word('sadly'), new Word('loser')];

    const validWords = new Dictionary([...words, winnerWord]);

    game = new Game(validWords, winnerWord);
  });

  test('game has won', () => {
    expect(game.hasWon()).toBe(false);

    game.addTry(winnerWord);

    expect(game.hasWon()).toBe(true);
  });

  test('what words were tried', () => {
    expect(game.wasTried()).toEqual([]);

    game.addTry(new Word('hello'));
    game.addTry(new Word('sadly'));

    expect(game.wasTried())
      .toEqual([new Word('hello'), new Word('sadly')]);
  });

  test('game has lost', () => {
    const MAX_TRIALS = 6;

    for (let i = 1; i < MAX_TRIALS; i += 1) {
      game.addTry(new Word('hello'));

      expect(game.hasLost()).toBe(false);
    }

    game.addTry(new Word('loser'));

    expect(game.hasLost()).toBe(true);
  });

  test('word is not included', () => {
    expect(() => {
      game.addTry(new Word('xxxxx'));
    }).toThrow(new Error('word is not included'));
  });

  describe('if winner word is not included in dictionary', () => {
    it('raises error', () => {
      expect(() => {
        const validWords = new Dictionary([new Word('hello')]);

        game = new Game(validWords, new Word('loser'));
      }).toThrow(new Error('Winner word must be in the dictionary'));
    });
  });
});
