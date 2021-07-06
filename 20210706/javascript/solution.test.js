test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(k, rates) {
  const bag = {
    won: k,
    dollar: 0,

    hasDollar() {
      return this.dollar > 0;
    },
    buy(cost) {
      this.won -= cost;
      this.dollar = 1;
    },
    sell(cost) {
      this.won += cost;
      this.dollar = 0;
    },
  };

  rates.forEach((rate, i) => {
    const nextRate = (rates[i + 1] ?? -1000);

    if (bag.won >= rate && !bag.hasDollar() && rate < nextRate) {
      bag.buy(rate);
      return;
    }

    if (bag.hasDollar() && rate > nextRate) {
      bag.sell(rate);
    }
  });

  return bag.won;
}

test('solution', () => {
  expect(solution(
    1000,
    [1000, 1200],
  )).toBe(1200);

  expect(solution(
    1000,
    [1000, 600, 1200],
  )).toBe(1600);

  expect(solution(
    1000,
    [1200, 1000, 1100, 1200, 900, 1000, 1500, 900, 750, 1100],
  )).toBe(2150);

  expect(solution(
    1000,
    [1200, 1000, 1000, 1000, 1100, 1200, 900, 1000, 1500, 900, 750, 1100],
  )).toBe(2150);

  expect(solution(
    1500,
    [1500, 1400, 1300, 1200],
  )).toBe(1500);
});
