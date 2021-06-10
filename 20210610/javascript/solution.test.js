class BracketStack {
  constructor() {
    this.data = [];
  }

  push(bracket) {
    const last = this.data[this.data.length - 1];

    if (bracket === ')' && last === '(') {
      this.data.pop();
      return;
    }
    this.data.push(bracket);
  }

  isEmpty() {
    return !this.data.length;
  }
}

describe('BracketStack', () => {
  describe('push', () => {
    it('pushes bracket', () => {
      const stack = new BracketStack();

      stack.push('(');

      expect(stack.isEmpty()).toBeFalsy();

      stack.push(')');

      expect(stack.isEmpty()).toBeTruthy();
    });
  });
});

function solution(s) {
  const stack = new BracketStack();

  [...s].forEach((bracket) => {
    stack.push(bracket);
  });

  return stack.isEmpty();
}

test('simple', () => {
  expect(solution('()')).toBeTruthy();
});

test('samples', () => {
  expect(solution('()()')).toBeTruthy();
  expect(solution('(())()')).toBeTruthy();

  expect(solution(')()(')).toBeFalsy();
  expect(solution('(()(')).toBeFalsy();
});
