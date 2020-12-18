// function hasIncreasingOrder(arr) {
//   const sorted = [...arr].sort((a, b) => a - b);
//   return arr.every((el, idx) => el === sorted[idx]);
// }

// test('hasIncreasingOrder', () => {
//   expect(hasIncreasingOrder([1, 2, 3])).toBeTruthy();
//   expect(hasIncreasingOrder([3, 2, 1])).toBeFalsy();
//   expect(hasIncreasingOrder([1, 4, 8, 11])).toBeTruthy();
//   expect(hasIncreasingOrder([12, 4, 8, 11])).toBeFalsy();
// });

function inspect(order, target) {
  const contained = [...target].filter((skill) => order.includes(skill)).join('');
  return order.indexOf(contained) === 0;
}

test('inspect', () => {
  expect(inspect('AB', 'ABC')).toBeTruthy();
  expect(inspect('AB', 'BCA')).toBeFalsy();
  expect(inspect('ABC', 'CAFDBE')).toBeFalsy();
  expect(inspect('ABC', 'CAFDE')).toBeFalsy();
  expect(inspect('ABCD', 'DAFE')).toBeFalsy();
});

function solution(skill, skillTrees) {
  return skillTrees
    .filter((skillTree) => inspect(skill, skillTree)).length;
}

test('solution', () => {
  expect(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA'])).toBe(2);
});
