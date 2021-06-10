test('test is working', () => {
  expect(1 + 1).toBe(2);
});

const enumerate = (array) => array
  .map((v, i) => [i, v]);

function solution(genres, plays) {
  const bestSongs = (genre) => enumerate(genres)
    .filter(([, v]) => v === genre)
    .map(([i]) => i)
    .sort((id1, id2) => plays[id2] - plays[id1])
    .slice(0, 2);

  const totalPlays = genres.reduce((accumulator, genre, id) => ({
    ...accumulator,
    [genre]: accumulator[genre]
      ? accumulator[genre] + plays[id]
      : plays[id],
  }), {});

  return [...new Set(genres)]
    .sort((g1, g2) => totalPlays[g2] - totalPlays[g1])
    .flatMap(bestSongs);
}

test('examples', () => {
  expect(solution(
    ['classic', 'pop', 'classic', 'classic', 'pop'],
    [500, 600, 150, 800, 2500],
  )).toEqual([4, 1, 3, 0]);
});
