test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(v) {
  const equals = (A, B) => A[0] === B[0] && A[1] === B[1];

  let A;
  let B;
  let C;

  v.forEach((a) => {
    v.forEach((b) => {
      if (a[0] !== b[0] && a[1] !== b[1]) {
        A = a;
        C = b;
      }
    });
  });

  B = v.filter((X) => !equals(X, A) && !equals(X, C))[0];

  return [
    A[0] + C[0] - B[0],
    A[1] + C[1] - B[1],
  ];
}

test('samples', () => {
  expect(solution([
    [1, 4],
    [3, 4],
    [3, 10],
  ])).toEqual([1, 10]);
});
