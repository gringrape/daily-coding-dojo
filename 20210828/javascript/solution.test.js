function upDown(letter) {
  const difference = letter.charCodeAt(letter) - 'A'.charCodeAt(0);
  return Math.min(
    difference, 26 - difference,
  );
}

function leftRight(letters, current) {
  if (new Set(letters).size === 1) {
    return [0, 0];
  }
  const right = () => {
    const i = letters.slice(current + 1).findIndex((l) => l !== 'A');
    return [i + 1 || 100, current + i + 1];
  };
  const left = () => {
    const i = [...letters, ...letters.slice(0, current)]
      .reverse().findIndex((l) => l !== 'A');

    const nextPosition = (current - (i + 1) < 0)
      ? letters.length + current - (i + 1)
      : current - (i + 1);

    return [i + 1 || 100, nextPosition];
  };
  const [ld, lp, rd, rp] = [...left(), ...right()];

  return (ld >= rd) ? [rd, rp] : [ld, lp];
}

function solution(name) {
  const letters = [...name];
  let count = 0;
  let current = 0;

  while (letters.some((l) => l !== 'A')) {
    const distance1 = upDown(letters[current]);
    letters[current] = 'A';
    const [distance2, next] = leftRight(letters, current);
    count += distance1 + distance2;
    current = next;
  }

  return count;
}

test('updown', () => {
  expect(solution('B')).toBe(1);
  expect(solution('C')).toBe(2);
  expect(solution('Z')).toBe(1);
});

test('right', () => {
  expect(solution('AB')).toBe(2);
});

test('sample', () => {
  expect(solution('JEROEN')).toBe(56);
  expect(solution('JAN')).toBe(23);
  expect(solution('ABAAAAAAAAABB')).toBe(7);
});
