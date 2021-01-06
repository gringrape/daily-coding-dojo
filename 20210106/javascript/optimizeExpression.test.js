const plus = (a, b) => a + b;
const mul = (a, b) => a * b;
const minus = (a, b) => a - b;

const calculator = {
  '+': plus,
  '*': mul,
  '-': minus,
};

function calculate(parts, oper) {
  const operIdx = parts.findIndex((el) => el === oper);

  if (operIdx === -1) {
    return parts;
  }

  parts.splice(operIdx - 1, 3, calculator[parts[operIdx]](
    parts[operIdx - 1],
    parts[operIdx + 1],
  ));

  return calculate(parts, oper);
}

test('calculate', () => {
  expect(calculate([5, '*', 3, '*', 3], '*')).toEqual([45]);
});

const parseToInt = (number) => {
  if (number === '0') {
    return 0;
  }
  return parseInt(number, 10) || number;
};

function solution(exp) {
  const parts = exp.split(/([+*-])/);
  const parsed = parts.map(parseToInt);

  const results = [
    ['*', '+', '-'],
    ['*', '-', '+'],
    ['+', '*', '-'],
    ['+', '-', '*'],
    ['-', '*', '+'],
    ['-', '+', '*'],
  ].map((operators) => operators.reduce(
    (acc, operator) => calculate(acc, operator), parsed.map((el) => el),
  )[0]);

  return Math.max(...results.map((num) => Math.abs(num)));
}

test('simple', () => {
  expect(solution('1*1')).toBe(1);
  expect(solution('1+1+0')).toBe(2);
  expect(solution('1+1')).toBe(2);
  expect(solution('2*3')).toBe(6);
  expect(solution('5-3')).toBe(2);
  expect(solution('5*3*3')).toBe(45);
  expect(solution('50*6-3*2')).toBe(300);
  expect(solution('100-200*300-500+20')).toBe(60420);
  expect(solution('2-990-5+2+3*2')).toBe(1996);
  expect(solution('2-990-5+2')).toBe(995);
});
