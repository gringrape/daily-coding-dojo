test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function combinations(array, n, result = '') {
  if (n === 0) {
    return [result];
  }

  return array
    .flatMap((a, i) => combinations(array.slice(i + 1), n - 1, [...result, a]));
}

// test('combinations', () => {
//   expect(combinations(['a', 'b', 'c'], 2)).toEqual(
//     ['ab', 'ac', 'bc'],
//   );
//   expect(combinations(['c', 'b', 'a'], 2)).toEqual(
//     ['ab', 'ac', 'bc'],
//   );
//   expect(combinations(['c', 'b', 'a', 'd'], 3)).toEqual(
//     ['abc', 'abd', 'acd', 'bcd'],
//   );
//   expect(combinations(['c', 'b', 'a', 'd', 'e'], 3)).toEqual(
//     ['abc', 'abd', 'abe', 'acd', 'ace', 'ade',
//       'bcd', 'bce', 'bde', 'cde',
//     ],
//   );
// });

function solution(orders, course) {
  const allMenus = [...orders.reduce((menus, order) => {
    [...order].forEach((i) => menus.add(i));
    return menus;
  }, new Set())];

  const menusOrderedMoreThanTwice = allMenus
    .filter((i) => orders.filter((order) => order.includes(i)).length >= 2);

  const countOrdered = (combination) => orders
    .filter(
      (order) => combination.every((c) => order.includes(c)),
    ).length;

  const bestCombinations = (count) => combinations(menusOrderedMoreThanTwice, count)
    .map((v) => [v, countOrdered(v)])
    .sort(([, count1], [, count2]) => count2 - count1)
    .filter(([, c], _, array) => array[0][1] === c)
    .filter(([, c]) => c >= 2)
    .map(([v]) => v.join(''));

  return course
    .flatMap(bestCombinations)
    .sort();
}

test('sample', () => {
  expect(solution(
    ['ABCFG', 'AC', 'CDE', 'ACDE', 'BCGF', 'ACDEH'],
    [2, 3, 4],
  )).toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
  expect(solution(
    ['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'],
    [2, 3, 5],
  )).toEqual(['ACD', 'AD', 'ADE', 'CD', 'XYZ']);
});
