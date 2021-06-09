test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function solution(genres, plays) {
  const range = (from, to) => Array(to - from).fill()
    .map((_, i) => i + from);

  const ids = range(0, genres.length);

  const playsOfGenres = ids.reduce((a, i) => ({
    ...a,
    [genres[i]]: a[genres[i]]
      ? a[genres[i]] + plays[i]
      : plays[i],
  }), {});

  return ids
    .sort((id1, id2) => id1 - id2)
    .sort((i) => plays[i])
    .sort((id1, id2) => playsOfGenres[id2] - playsOfGenres[id1]);
}

test('examples', () => {
  expect(solution(
    ['classic', 'pop', 'classic', 'classic', 'pop'],
    [500, 600, 150, 800, 2500],
  )).toEqual(
    [4, 1, 3, 0],
  );
});
