/* eslint-disable no-param-reassign */
function range(from, to) {
  return Array(to - from).fill().map((_, i) => from + i);
}

function solution(n, lost, reserve) {
  const borrow = (index, state) => {
    const number = index - 1;

    if (state[number] > 0) return;

    if (state[number - 1] > 1) {
      state[number - 1] -= 1;
      state[number] += 1;
      return;
    }

    if (state[number + 1] > 1) {
      state[number + 1] -= 1;
      state[number] += 1;
    }
  };

  const trainingSuits = Array(n).fill(1);

  reserve.forEach((r) => { trainingSuits[r - 1] += 1; });
  lost.forEach((l) => { trainingSuits[l - 1] -= 1; });

  const students = range(0, n + 1);

  students.forEach((i) => borrow(i, trainingSuits));

  return trainingSuits.filter((s) => s > 0).length;
}

test('test works', () => {
  expect(1 + 1).toBe(2);
});

test('simple', () => {
  expect(solution(2, [1], [2])).toBe(2);
});

test('reserve enough', () => {
  expect(solution(5, [2, 4], [1, 3, 5])).toBe(5);
});

test('reserve not enough', () => {
  expect(solution(5, [2, 4], [3])).toBe(4);
});
