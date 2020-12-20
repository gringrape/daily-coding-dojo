/* eslint-disable consistent-return */
function isPrime(n) {
  if (!n || n < 2) {
    return false;
  }

  if (n === 2) {
    return true;
  }

  return Array(Math.ceil(Math.sqrt(n)))
    .fill()
    .map((_, idx) => idx + 1)
    .slice(1)
    .every((el) => n % el !== 0);
}

test('isPrime', () => {
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(1213)).toBe(true);
  expect(isPrime(1)).toBe(false);
  expect(isPrime(NaN)).toBe(false);
  expect(isPrime(null)).toBe(false);
  expect(isPrime(undefined)).toBe(false);
});

function findPrimes(
  arr, set, basket = [], namedArr = arr.map((el, idx) => [el, idx]),
) {
  if (basket.length > arr.length) {
    return;
  }

  const numberString = basket.map((idx) => arr[idx]).join('');
  const number = parseInt(numberString, 10);

  if (isPrime(number)) {
    set.add(number);
  }

  namedArr
    .filter(([, idx]) => !basket.includes(idx)) // 순회 조건 설정
    .forEach(([, idx]) => findPrimes(arr, set, basket.concat(idx)));
}

describe('findPrimes', () => {
  const set = new Set();

  beforeEach(() => {
    set.clear();
  });

  it('test case 1', () => {
    findPrimes(['1', '7'], set);

    expect(set.size).toBe(3);
  });

  it('test case 2', () => {
    findPrimes(['0', '1', '1'], set);

    expect(set.size).toBe(2);
  });
});

function solution(str) {
  const set = new Set();
  findPrimes([...str], set);
  return set.size;
}

test('solution', () => {
  expect(solution('17')).toBe(3);
  expect(solution('011')).toBe(2);
  expect(solution('0000000')).toBe(0);
  expect(solution('71')).toBe(3);
});
