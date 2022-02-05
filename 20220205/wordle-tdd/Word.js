export default class Word {
  constructor(word) {
    if (word.length !== 5) {
      throw new Error('Word must be 5 letters');
    }

    if (/[^a-z]/i.test(word)) {
      throw new Error('Word contains invalid characters');
    }

    this.word = word;
  }

  matchesPositionWith(other) {
    return this.letters()
      .map((_, index) => index)
      .filter((i) => this.word[i] === other.word[i]);
  }

  matchesIncorrectPositionWith(other) {
    return other.letters()
      .filter((letter, index) => (
        this.word.includes(letter) && this.word[index] !== letter
      ))
      .map((_, index) => index);
  }

  letters() {
    return this.word.split('');
  }

  equals(other) {
    return this.word.toString() === other.word.toString();
  }
}
