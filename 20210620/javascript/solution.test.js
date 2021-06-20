/* eslint-disable no-continue */
/* eslint-disable prefer-const */
test('test is working', () => {
  expect(1 + 1).toBe(2);
});

const difference = ([low, high]) => Math.abs(high - low);

class GemBag {
  constructor() {
    this.bag = new Map();
  }

  get kindsOfGems() {
    return this.bag.size;
  }

  check(gem) {
    return this.bag.get(gem);
  }

  put(gem) {
    if (this.bag.has(gem)) {
      this.bag.set(
        gem,
        this.bag.get(gem) + 1,
      );
      return;
    }

    this.bag.set(gem, 1);
  }

  take(gem) {
    const current = this.bag.get(gem);

    if (current === 1) {
      this.bag.delete(gem);
      return;
    }

    this.bag.set(
      gem,
      current - 1,
    );
  }
}

describe('GemBag', () => {
  test('size', () => {
    const bag = new GemBag();

    expect(bag.kindsOfGems).toBe(0);
  });

  test('put', () => {
    const bag = new GemBag();

    bag.put('L');

    expect(bag.check('L')).toBe(1);

    bag.put('L');

    expect(bag.check('L')).toBe(2);
  });

  test('take', () => {
    const bag = new GemBag();

    bag.put('L');
    bag.put('L');
    bag.put('R');

    bag.take('L');
    expect(bag.check('L')).toBe(1);

    expect(bag.kindsOfGems).toBe(2);
    bag.take('R');
    expect(bag.kindsOfGems).toBe(1);
  });
});

function solution(gems) {
  let candidateRanges = [];

  const kinds = new Set(gems).size;
  const bag = new GemBag();

  let start = 0;
  let end = 0;

  bag.put(gems[start]);

  while (end < gems.length) {
    if (bag.kindsOfGems === kinds) {
      candidateRanges.push([start + 1, end + 1]);

      bag.take(gems[start]);
      start += 1;
      continue;
    }

    end += 1;
    bag.put(gems[end]);
  }

  return candidateRanges
    .sort((e1, e2) => e1[0] - e2[0])
    .sort((e1, e2) => difference(e1) - difference(e2))[0];
}

test('samples', () => {
  expect(solution(
    ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'],
  )).toEqual([3, 7]);
  expect(solution(
    ['AA', 'AB', 'AC', 'AA', 'AC'],
  )).toEqual([1, 3]);
});
