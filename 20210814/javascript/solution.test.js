function solution(enroll, referral, seller, amount) {
  const profits = {};
  const referrals = {};
  enroll.forEach((c, i) => {
    profits[c] = [];
    referrals[c] = referral[i];
  });
  profits['-'] = [];

  amount.forEach((sell, i) => {
    const money = sell * 100;
    const member = seller[i];

    profits[member].push(money);
  });

  enroll.reverse().forEach((member) => {
    const teacher = referrals[member];
    const thisProfits = profits[member];

    if (thisProfits.length === 0) {
      return;
    }

    thisProfits.forEach((profit, i) => {
      const mine = Math.ceil(profit * 0.9);
      thisProfits[i] = mine;

      if (profit !== mine) {
        profits[teacher].push(profit - mine);
      }
    });
  });

  return enroll.reverse()
    .map((member) => profits[member].reduce((a, c) => a + c, 0));
}

test('sample', () => {
  expect(solution(
    ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
    ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
    ['young', 'john', 'tod', 'emily', 'mary'],
    [12, 4, 2, 5, 10],
  )).toEqual([360, 958, 108, 0, 450, 18, 180, 1080]);
});
