test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(n) {
  function go(k, count = 0) {
    if (k === 1) {
      return count;
    }

    if (count > 500) {
      return -1;
    }

    const nextNumber = k % 2 === 1 ? 3 * k + 1 : k / 2;

    return go(nextNumber, count + 1);
  }

  return go(n);
}

// function solution(n) {
//   const limit = 500;
//   const { count: result, k: last } = Array(limit).fill()
//     .reduce(({ count, k }) => {
//       if (k === 1) {
//         return { count, k };
//       }

//       return {
//         count: count + 1,
//         k: (k % 2 === 1)
//           ? k * 3 + 1
//           : k / 2,
//       };
//     }, {
//       count: 0,
//       k: n,
//     });

//   return last === 1 ? result : -1;
// }

test('samples', () => {
  expect(solution(6)).toBe(8);
  expect(solution(16)).toBe(4);
  expect(solution(626331)).toBe(-1);
});
