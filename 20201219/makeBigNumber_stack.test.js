function solution(n, k) {
  let p = 0;
  let stack = [];
  while (k > 0) {
    if (p > n.length - 1) {
      return stack.join('').slice(0, -k);
    }

    const currentNumber = n[p];
    if (stack.length === 0) {
      stack.push(currentNumber);
      p += 1;
      continue;
    }

    const lastIndex = stack.length - 1;

    if (stack[lastIndex] < currentNumber) {
      stack.pop();
      k -= 1;
      continue;
    }

    stack.push(currentNumber);
    p += 1;
  }
  return stack.join('') + n.slice(p);
}

test('solution', () => {
  expect(solution('1924', 2)).toEqual('94');
  expect(solution('1231234', 3)).toEqual('3234');
  expect(solution('4177252841', 4)).toEqual('775841');
  expect(solution('2222', 2)).toEqual('22');
  expect(solution('11', 1)).toEqual('1');
  expect(solution('10', 1)).toEqual('1');
  expect(solution('10000', 2)).toEqual('100');
  expect(solution('99998', 3)).toEqual('99');
  expect(solution('999999', 3)).toEqual('999');
  expect(solution('1001', 2)).toEqual('11');
});
