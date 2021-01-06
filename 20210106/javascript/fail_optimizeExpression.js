// const parse = (num) => parseInt(num, 10);

// function replacer(match, num1, operator, num2) {
//   const operate = {
//     '+': (a, b) => a + b,
//     '*': (a, b) => a * b,
//     '-': (a, b) => a - b,
//   };

//   const [a, b] = [num1, num2].map(parse);

//   const result = operate[operator](a, b);

//   return result < 0 ? `(${result})` : result;
// }

// function transform(exp, operator) {
//   console.log(exp);
//   if (exp.search(new RegExp(`[${operator}]`)) === -1) {
//     return exp;
//   }

//   const replaced = exp.replace(new RegExp(`(\\d+)([${operator}])(\\d+)`), replacer);

//   return replaced === exp ? exp : transform(replaced, operator);
// }

// test('transform', () => {
//   expect(transform('9*5', '*')).toBe('45');
//   expect(transform('9+5', '+')).toBe('14');
//   expect(transform('9-5', '-')).toBe('4');
//   expect(transform('3*5*5', '*')).toBe('75');
//   expect(transform('5+5+5', '+')).toBe('15');
//   expect(transform('5*5+5', '*')).toBe('25+5');
//   expect(transform('5*5+5', '+')).toBe('5*10');
//   expect(transform('5-10+5-3', '-')).toBe('(-5)+2');
// });

// function solution(exp) {
//   const results = [
//     ['-', '*', '+'],
//     ['-', '+', '*'],
//     ['+', '-', '*'],
//     ['+', '*', '-'],
//     ['*', '-', '+'],
//     ['*', '+', '-'],
//   ]
//     .map((operators) => operators.reduce((acc, cur) => transform(acc, cur), exp));

//   return Math.max(...results.map(parse).map((num) => Math.abs(num)));
// }

// test('sample', () => {
//   expect(solution('50*6-3*2')).toBe(300);
//   expect(solution('100-200*300-500+20')).toBe(60420);
// });
