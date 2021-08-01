function range(start, end) {
  return [...Array(end - start)].map((_, i) => start + i);
}

function solution(N, roads, K) {
  const minTimes = [0, ...Array(N - 1).fill(Number.MAX_SAFE_INTEGER - 1000)];

  const times = [...Array(N)].map(() => Array(N).fill(null));

  range(0, N).forEach((i) => {
    times[i][i] = 0;
  });

  roads.sort(([,, a], [,, b]) => b - a).forEach(([first, second, time]) => {
    times[first - 1][second - 1] = time;
    times[second - 1][first - 1] = time;
  });

  const Q = range(1, N + 1);
  Q.sortByMinTimes = () => Q.sort((a, b) => minTimes[a - 1] - minTimes[b - 1]);

  Q.sortByMinTimes();
  while (Q.length > 0) {
    const min = Q.shift();

    range(1, N + 1).forEach((town) => {
      const between = times[min - 1][town - 1];

      if (between === null) {
        return;
      }

      minTimes[town - 1] = Math.min(
        minTimes[town - 1],
        minTimes[min - 1] + between,
      );
    });

    Q.sortByMinTimes();
  }

  return minTimes
    .filter((time) => time <= K)
    .length;
}

test('sample', () => {
  expect(solution(
    5,
    [[1, 2, 1], [2, 3, 3], [5, 2, 2], [1, 4, 2], [5, 3, 1], [5, 4, 2]],
    3,
  )).toBe(4);
});
