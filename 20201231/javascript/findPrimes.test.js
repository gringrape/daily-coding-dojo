function findFirstPrime(number, divisor = 2) {
  return number % divisor === 0 ? divisor : findFirstPrime(number, divisor + 1);
}

function findPrimes(number) {
  if (number < 2) {
    return [];
  }

  const firstPrime = findFirstPrime(number);

  return [
    firstPrime,
    ...findPrimes(number / firstPrime),
  ];
}

test('findPrimes', () => {
  expect(findPrimes(1)).toEqual([]);
  expect(findPrimes(2)).toEqual([2]);
  expect(findPrimes(3)).toEqual([3]);
  expect(findPrimes(4)).toEqual([2, 2]);
  expect(findPrimes(6)).toEqual([2, 3]);
  expect(findPrimes(8)).toEqual([2, 2, 2]);
  expect(findPrimes(1000)).toEqual([2, 2, 2, 5, 5, 5]);
  expect(findPrimes(3680)).toEqual([2, 2, 2, 2, 2, 5, 23]);
});
