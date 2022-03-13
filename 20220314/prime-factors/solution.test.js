function rangeClosed(startInclusive, endInclusive) {
  if (endInclusive < startInclusive) {
    return [];
  }

  return [...Array(endInclusive - startInclusive + 1)]
    .map((_, i) => startInclusive + i);
}

class Numver {
  constructor(n) {
    this.n = n;
  }

  smallestPrimeFactor() {
    const found = rangeClosed(2, Math.floor(Math.sqrt(this.n)))
      .find((i) => this.n % i === 0);

    return found || this.n;
  }

  primeFactors() {
    if (this.n < 2) {
      return [];
    }

    const prime = this.smallestPrimeFactor();

    const isPrimeNumber = prime === this.n;
    if (isPrimeNumber) {
      return [this.n];
    }

    return [
      prime,
      ...new Numver(this.n / prime).primeFactors(),
    ];
  }
}

test('rangeClosed', () => {
  expect(rangeClosed(1, 5)).toEqual([1, 2, 3, 4, 5]);
});

describe('Number', () => {
  describe('prime factors', () => {
    test('no factors', () => {
      expect(new Numver(1).primeFactors()).toEqual([]);
    });

    test('prime numbers', () => {
      [2, 3, 11].forEach((i) => {
        expect(new Numver(i).primeFactors()).toEqual([i]);
      });
    });

    test('composite numbers', () => {
      expect(new Numver(4).primeFactors()).toEqual([2, 2]);
      expect(new Numver(6).primeFactors()).toEqual([2, 3]);
      expect(new Numver(100).primeFactors()).toEqual([2, 2, 5, 5]);
    });
  });
});
