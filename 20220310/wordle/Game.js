class Game {
  constructor(answer) {
    this.answer = answer;
  }

  findGreenPositionsFor(guess) {
    const guessLetters = guess.getLetters();
    const answerLetters = this.answer.getLetters();
    const result = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === answerLetters[i]) {
        result.push(i);
      }
    }

    return result;
  }
}

module.exports = Game;
