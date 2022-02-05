export default class Dictionary {
  constructor(words = []) {
    this.words = words;
  }

  wordsCount() {
    return this.words.length;
  }

  includes(word) {
    return this.words.some((w) => w.equals(word));
  }
}
