export default class Game {
  wordsTried = [];

  constructor(dictionary, winnerWord) {
    if (!dictionary.includes(winnerWord)) {
      throw new Error('Winner word must be in the dictionary');
    }

    this.dictionary = dictionary;
    this.winnerWord = winnerWord;
  }

  hasWon() {
    return this.wordsTried.some((word) => word.equals(this.winnerWord));
  }

  wasTried() {
    return this.wordsTried;
  }

  addTry(trial) {
    if (!this.dictionary.includes(trial)) {
      throw new Error('word is not included');
    }

    this.wordsTried.push(trial);
  }

  hasLost() {
    return this.wordsTried.length > 5;
  }
}
