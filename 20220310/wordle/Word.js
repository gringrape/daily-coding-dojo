class Word {
  LIMIT = 5;

  constructor(letters) {
    if (letters.length !== this.LIMIT) {
      throw new Error('5글자여야만 합니다.');
    }

    this.letters = letters;
  }

  getLetters() {
    return this.letters;
  }
}

module.exports = Word;
