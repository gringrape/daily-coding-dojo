function solution(
  n, r, basket = [], arr = Array(n).fill().map((_, idx) => idx + 1),
) {
  if (basket.length === r) {
    return 1;
  }

  return arr
    .filter((el) => el > Math.max(...basket)) // 여기에 따라서 차이가 난다
    .reduce((acc, curr) => acc + solution(n, r, basket.concat(curr), arr), 0);
}

test('combination', () => {
  expect(solution(5, 3)).toBe(10);
  expect(solution(10, 3)).toBe(120);
});

function permutation(
  n, r, basket = [], arr = Array(n).fill().map((_, idx) => idx + 1),
) {
  if (basket.length === r) {
    return 1;
  }

  return arr
    .filter((el) => !basket.includes(el)) // 여기에 따라서 차이가 난다
    .reduce((acc, curr) => acc + permutation(n, r, basket.concat(curr), arr), 0);
}

test('permutation', () => {
  expect(permutation(5, 3)).toBe(60);
  expect(permutation(10, 3)).toBe(720);
});
