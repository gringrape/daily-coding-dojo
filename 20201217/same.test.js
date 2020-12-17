const getLast = (arr) => arr.slice(-1)[0];

function solution(arr) {
  const reducer = (acc, num) => getLast(acc) === num ? acc : [...acc, num];

  return arr.reduce(reducer, []);
}

test('solution', () => {
  expect(solution([1,1])).toEqual([1]);

  expect(solution([1, 1, 3, 3, 0, 1, 1])).toEqual([1, 3, 0, 1]);

  expect(solution([4, 4, 4, 3, 3])).toEqual([4, 3]);
});
