// 1. tail recursion
function fib(n, a = 1, b = 1) {
  if (n === 1) {
    return a;
  }

  return fib(n - 1, b, a + b);
}

test('fib', () => {
  expect(fib(1)).toBe(1);
  expect(fib(2)).toBe(1);
  expect(fib(3)).toBe(2);
  expect(fib(4)).toBe(3);
  expect(fib(5)).toBe(5);
  expect(fib(9)).toBe(34);
});
