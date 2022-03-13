export default class Parser {
  constructor() {
    this.index = 0;
    this.buffer = [];
    this.strings = [];
    this.state = 'lookForString';
  }

  ignore() {
    this.index += 1;
  }

  startNewString() {
    this.index += 1;
    this.buffer = [];
  }

  addCurrentToString(character) {
    this.buffer.push(character);
    this.index += 1;
  }

  finishCurrentString() {
    this.strings.push(this.buffer.join(''));
    this.index += 1;
  }

  transition(state, character) {
    const parser = this;

    return {
      lookForString() {
        if (character === '"') {
          return {
            state: 'inString',
            action: parser.startNewString.bind(parser),
          };
        }

        return {
          state: 'lookForString',
          action: parser.ignore.bind(parser),
        };
      },
      inString() {
        if (character === '\\') {
          return {
            state: 'copyNextCharacter',
            action: parser.addCurrentToString.bind(parser),
          };
        }

        if (character === '"') {
          return {
            state: 'lookForString',
            action: parser.finishCurrentString.bind(parser),
          };
        }

        return {
          state: 'inString',
          action: parser.addCurrentToString.bind(parser),
        };
      },
      copyNextCharacter() {
        return {
          state: 'inString',
          action: parser.addCurrentToString.bind(parser),
        };
      },
    }[state]();
  }

  parse(text) {
    if (this.index >= text.length) {
      return this.strings;
    }

    const character = text[this.index];

    const { state, action } = this.transition(this.state, character);
    this.state = state;
    action(character);

    return this.parse(text);
  }
}
