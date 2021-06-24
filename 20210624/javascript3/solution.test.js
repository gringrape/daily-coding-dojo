test('test works', () => {
  expect(1 + 1).toBe(2);
});

function visit(computers, i = 0, mark) {
  if (computers[i][i] !== 1) {
    return;
  }

  computers[i][i] = mark;

  computers[i].forEach((_, j) => {
    if (j > i && computers[i][j] === 1) {
      visit(computers, j, mark);
    }
  });
}

test('visit all computers of network1', () => {
  const computers = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];

  visit(computers, 0, 2);

  expect(computers).toEqual([
    [2, 1, 0],
    [1, 2, 0],
    [0, 0, 1],
  ]);
});

test('visit all computers of network3', () => {
  const computers = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];

  visit(computers, 2, 2);

  expect(computers).toEqual([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 2],
  ]);
});

test('visit with marks', () => {
  const computers = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];

  Array(3).fill()
    .map((_, i) => i)
    .forEach((i) => visit(computers, i, i + 2));

  expect(computers).toEqual([
    [2, 1, 0],
    [1, 2, 0],
    [0, 0, 4],
  ]);
});

function solution(n, computers) {
  Array(n).fill().map((_, i) => i)
    .forEach((i) => {
      visit(computers, i, i + 2);
    });

  console.log(computers);

  const nodes = computers.map((row, i) => row[i]);

  return new Set(nodes).size;
}

describe('solution', () => {
  it('returns the number of networks', () => {
    const computers = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ];

    expect(solution(3, computers)).toBe(2);
  });

  it('returns the number of networks', () => {
    const computers = [
      [1, 1, 0],
      [1, 1, 1],
      [0, 1, 1],
    ];

    expect(solution(3, computers)).toBe(1);
  });

  it('returns the number of networks', () => {
    const computers = [
      [1, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 1, 1],
      [0, 0, 1, 1],
    ];

    expect(solution(4, computers)).toBe(2);
  });
});
