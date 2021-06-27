test('test works', () => {
  expect(1 + 1).toBe(2);
});

function zip(iterable1, iterable2) {
  return Array(iterable1.length).fill()
    .map((_, i) => [iterable1[i], iterable2[i]]);
}

const calculate = (operator) => (a, b) => ((
  {
    '+': a + b,
    '-': a - b,
    '*': a * b,
  }[operator]
));

function operate(numbers, operators, priorOperator) {
  const numberStack = [numbers[0]];
  const operatorStack = [];

  zip(numbers.slice(1), operators)
    .forEach(([number, operator]) => {
      if (operator !== priorOperator) {
        numberStack.push(number);
        operatorStack.push(operator);
        return;
      }

      const accumulator = numberStack.pop();
      numberStack.push(
        calculate(operator)(accumulator, number),
      );
    });

  return [numberStack, operatorStack];
}

test('operate', () => {
  expect(operate([1, 2, 3], ['+', '*'], '*')).toEqual([[1, 6], ['+']]);
});

function reward(numbers, operators, priority) {
  const [results] = priority.reduce((acc, priorOperator) => (
    operate(acc[0], acc[1], priorOperator)
  ), [numbers, operators]);

  return Math.abs(results[0]);
}

function solution(expression) {
  const numbers = expression
    .split(/[^\d]/)
    .map((n) => parseInt(n, 10));

  const operators = expression
    .replace(/\d{1,}/g, '')
    .split('');

  const priorities = [
    ['*', '+', '-'], ['*', '-', '+'],
    ['+', '*', '-'], ['*', '-', '*'],
    ['-', '+', '*'], ['-', '*', '+'],
  ];

  const rewards = priorities.map((priority) => reward(numbers, operators, priority));

  return Math.max(...rewards);
}

test('sample', () => {
  expect(solution('100-200*300-500+20')).toBe(60420);
});
