function getLast(arr) {
  return arr[arr.length - 1] || 2;
}

function findNeededPrimes(number, primes = [2], curr = 2) {
  const prime = getLast(primes);
  if (number < prime ** 2) {
    return primes;
  }

  const updatedPrimes = primes.every((each) => curr % each !== 0)
    ? [...primes, curr]
    : primes;
  
  return findNeededPrimes(number, updatedPrimes, curr + 1);
}

test('findNeededPrimes', () => {
  expect(findNeededPrimes(2)).toEqual([2]);
  expect(findNeededPrimes(100)).toEqual([2, 3, 5, 7, 11]);
  expect(findNeededPrimes(50)).toEqual([2, 3, 5, 7, 11]);
  expect(findNeededPrimes(400)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23]);
});

function solution(number) {
  const primes = findNeededPrimes(number);

  return Array(number)
    .fill(0)
    .map((_, idx) => idx + 1)
    .filter((num) => num > getLast(primes))
    .filter((num) => primes.every((prime) => num % prime !== 0))
    .length + primes.length;
}

test('solution', () => {
  expect(solution(10)).toBe(4);
  expect(solution(2)).toBe(1);
});
