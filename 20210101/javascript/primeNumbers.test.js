function findPrime(number, devisor = 2) {
  if (number % devisor === 0) {
    return devisor;
  }
  return findPrime(number, devisor + 1);
}

test('findPrime', () => {
  expect(findPrime(2)).toBe(2);
  expect(findPrime(7)).toBe(7);
  expect(findPrime(25)).toBe(5);
});

function* generatePrimes(number) {
  if (number < 2) {
    return;
  }
  const prime = findPrime(number);

  yield prime;
  yield* generatePrimes(number / prime);
}

test('generatePrimes', () => {
  expect([...generatePrimes(1)]).toEqual([]);
  expect([...generatePrimes(2)]).toEqual([2]);
  expect([...generatePrimes(3)]).toEqual([3]);
  expect([...generatePrimes(4)]).toEqual([2, 2]);
  expect([...generatePrimes(8)]).toEqual([2, 2, 2]);
  expect([...generatePrimes(1000)]).toEqual([2, 2, 2, 5, 5, 5]);
});
