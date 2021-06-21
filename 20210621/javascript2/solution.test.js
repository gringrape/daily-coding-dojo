test('test is work', () => {
  expect(1 + 1).toBe(2);
});

function combinations(menus, pick) {
  const result = [];

  function go(i = -1, combination = []) {
    if (combination.length === pick) {
      result.push(combination.sort().join(''));
      return;
    }

    [...menus].forEach((menu, j) => {
      if (j > i) {
        go(j, [...combination, menu]);
      }
    });
  }

  go();

  return result;
}

test('combinations', () => {
  expect(combinations('ABC', 2))
    .toEqual(['AB', 'AC', 'BC']);

  expect(combinations('ABCD', 3))
    .toEqual(['ABC', 'ABD', 'ACD', 'BCD']);
});

function solution(orders, course) {
  function pickMenus(courseCount) {
    const combs = orders.flatMap((order) => combinations(order, courseCount));

    const combToCounts = combs.reduce((map, comb) => (map[comb]
      ? {
        ...map,
        [comb]: map[comb] + 1,
      }
      : {
        ...map,
        [comb]: 1,
      }), {});

    const candidates = Object.entries(combToCounts);

    const maxCount = Math.max(...candidates.map(([, count]) => count));

    const picked = candidates
      .filter(([, count]) => count === maxCount && count > 1)
      .map(([menus]) => menus);

    return picked;
  }

  return course.flatMap(pickMenus).sort();
}

test('samples', () => {
  expect(solution(
    ['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'],
    [2, 3, 4],
  )).toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
  expect(solution(
    ['XYZ', 'XWY', 'WXA'],
    [2, 3, 4],
  )).toEqual(['WX', 'XY']);
});
