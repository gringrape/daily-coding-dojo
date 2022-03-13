# 프로젝트 구성
```bash
npm init -y

npm install --save-dev jest @types/jest@swc/core @swc/jest regenerator-runtime

```

swc/jest 설정 참고: https://github.com/swc-project/jest

`jest.config.js`:
```javascript
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        target: 'es2021'
      },
    }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
}
```

eslint 설정
```
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```

다음번에 설정하기 귀찮으니 위의 설정을 템플릿으로 저장함.
template: https://github.com/gringrape/templates/tree/main/javascript-playground

## 주제 정리
- 임의의 `텍스트`가 주어질때 `문자열`을 탐색해서 모두 가져오는 어플리케이션을 작성하시오.
### 문자열이란?
- 따옴표(")로 시작하고 끝나는 문자들의 모음.
- 단, 역슬래시(\\)와 따옴표가 같이 쓰인 경우, 따옴표의 기능을 무시함.
### 예시1
- 텍스트: "나는" 바다를 "좋아한다"
- 실행결과: ['나는', '좋아한다']
### 예시2
- 텍스트: \"나는 바다를 좋아한다\"
- 실행결과: ['\"나는 바다를 좋아한다\"']

## 개발 계획
- 목적: Finite State Machine 을 실습하기 위한 예제. 
- 실용주의 프로그래머 p.197에 나오는 상태기계를 사용.
- 구체적인 구성방식 및 테스트는 구현 상황에 맞추어서 변경.

## TODO List 
- 빈 텍스트.
- 텍스트가 문자열을 포함하지 않는 경우.
- 텍스트가 문자열을 포함하는 경우.
- 텍스트가 여러개의 문자열을 포함하는 경우.
- 텍스트가 역슬래시를 포함하는 경우.

## Parser class
```javascript
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
```

테스트
```javascript
import Parser from './Parser';

describe('parse', () => {
  context('with empty text', () => {
    const text = '';

    it('returns empty list', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual([]);
    });
  });

  context('with text containing no string', () => {
    const text = 'abc';

    it('returns empty list', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual([]);
    });
  });

  context('with text containing a string', () => {
    const text = 'eee "abc"';

    it('returns list with the string', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual(['abc']);
    });
  });

  context('with text containing a string', () => {
    const text = '기후변화에 대해서 "fun" 하고 "cool" 하고 "sexy" 하게 대처해야 한다';

    it('returns list with the string', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual(['fun', 'cool', 'sexy']);
    });
  });

  context('with text containing back slash', () => {
    const text = '"기후변화에 대해서 \\"fun\\" 하고 \\"cool\\" 하고 \\"sexy\\" 하게 대처해야 한다"';

    it('returns list with the string', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual(['기후변화에 대해서 \\"fun\\" 하고 \\"cool\\" 하고 \\"sexy\\" 하게 대처해야 한다']);
    });
  });
});

```