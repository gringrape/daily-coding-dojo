class WordList {
  constructor(dictionary) {
    this.dictionary = dictionary;
  }

  include(word) {
    return this.dictionary.includes(word.getLetters());
  }
}

module.exports = WordList;
