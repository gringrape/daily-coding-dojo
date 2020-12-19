function isPrime(n) {
  return Array(Math.ceil(Math.sqrt(n)))
    .fill()
    .map((_, idx) => idx + 1)
    .slice(1)
    .every((el) => n % el !== 0);
}

test('isPrime', () => {
  expect(isPrime(5)).toBe(true);
  expect(isPrime(1213)).toBe(true);
});

function solution(
  nums, n = nums.length, r = 3, basket = [], arr = Array(n).fill().map((_, idx) => idx),
) {
  if (basket.length === r) {
    const sum = basket
      .map((idx) => nums[idx])
      .reduce((acc, curr) => acc + curr, 0);
    return isPrime(sum) ? 1 : 0;
  }

  return arr
    .filter((el) => el > Math.max(...basket)) // 여기에 따라서 차이가 난다
    .reduce((acc, curr) => acc + solution(nums, n, r, basket.concat(curr), arr), 0);
}

test('combination', () => {
  expect(solution([1, 2, 3, 4])).toBe(1);
  expect(solution([1, 2, 7, 6, 4])).toBe(4);
});
