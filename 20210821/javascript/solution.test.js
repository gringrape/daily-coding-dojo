class Door {
  constructor(passwordTable) {
    this.mode = 0;
    this.house = null;
    this.houses = new Set(Object.keys(passwordTable));
    this.passwordTable = passwordTable;
  }

  check(str) {
    if (this.mode === 0 && this.houses.has(str)) {
      this.mode = 1;
      this.house = str;

      return 'house checked';
    }

    if (this.mode === 1 && this.passwordTable[this.house] == str) {
      this.mode = 0;
      this.house = null;
      return 'opened';
    }

    this.mode = 0;
    this.house = null;
    return null;
  }
}

function solution(passwords, s) {
  const passwordTable = Object.fromEntries(passwords);

  const door = new Door(passwordTable);

  return s.split('#').filter((i) => i).reduce((count, input) => {
    if (door.check(input) === 'opened') {
      return count + 1;
    }
    return count;
  }, 0);
}

test('test simple', () => {
  expect(solution(
    [[101, 1234], [102, 54321], [201, 202], [202, 1]],
    '101#1234#',
  )).toBe(1);

  expect(solution(
    [[101, 9999], [102, 1111]],
    '201#9999#101#',
  )).toBe(0);

  expect(solution(
    [[101, 9999], [102, 1111]],
    '101#9999#102#1111#101#9999#101#9999#',
  )).toBe(4);
});
