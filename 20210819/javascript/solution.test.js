function take(target) {
  return (table) => {
    const { length: M } = table;
    const { length: N } = table[0];

    const record = JSON.parse(JSON.stringify(table));

    function search(i, j) {
      const outOfBoundary = (r, c) => (
        r < 0 || r >= M || c < 0 || c >= N
      );

      if (outOfBoundary(i, j) || record[i][j] !== target) {
        return [];
      }

      record[i][j] = 2;

      return [
        [i, j],
        ...search(i + 1, j),
        ...search(i - 1, j),
        ...search(i, j + 1),
        ...search(i, j - 1),
      ];
    }

    return table.flatMap((r, i) => r.flatMap((_, j) => (
      record[i][j] === target ? [search(i, j)] : []
    )));
  };
}

const takeFrames = take(0);
const takeBlocks = take(1);

test('take blocks', () => {
  expect(takeBlocks([
    [1, 1],
    [1, 0],
  ])).toEqual([
    [[0, 0], [1, 0], [0, 1]],
  ]);

  expect(takeBlocks([
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
  ])).toEqual([
    [[0, 0], [1, 0], [0, 1]],
    [[1, 2], [2, 2], [2, 1]],
  ]);
});

test('take frames', () => {
  expect(takeFrames([
    [0, 0],
    [0, 1],
  ])).toEqual([
    [[0, 0], [1, 0], [0, 1]],
  ]);

  expect(takeFrames([
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ])).toEqual([
    [[0, 0], [1, 0], [0, 1]],
    [[1, 2], [2, 2], [2, 1]],
  ]);
});

function rotate(block) {
  const xs = block.map(([x]) => x);
  const ys = block.map(([, y]) => y);

  const M = Math.max(
    Math.max(...xs),
    Math.max(...ys),
  );

  const degrees = [90, 180, 270];

  return degrees.reduce((blocks) => {
    const prev = blocks[blocks.length - 1];
    return [
      ...blocks,
      prev.map(([x, y]) => [y, M - x]),
    ];
  }, [block]);
}

test('rotate', () => {
  expect(rotate([
    [0, 0], [0, 1], [0, 2], [1, 0],
  ])).toEqual([
    [[0, 0], [0, 1], [0, 2], [1, 0]],
    [[0, 2], [1, 2], [2, 2], [0, 1]],
    [[2, 2], [2, 1], [2, 0], [1, 2]],
    [[2, 0], [1, 0], [0, 0], [2, 1]],
  ]);

  expect(rotate([
    [0, 0],
  ])).toEqual([
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
  ]);
});

function match(frame, block) {
  if (frame.length !== block.length) {
    return false;
  }

  const rotates = rotate(block);

  return rotates.some((form) => {
    frame
      .sort(([a1, b1], [a2, b2]) => a1 - a2)
      .sort(([a1, b1], [a2, b2]) => b1 - b2);
    form
      .sort(([a1, b1], [a2, b2]) => a1 - a2)
      .sort(([a1, b1], [a2, b2]) => b1 - b2);

    const [offsetX, offsetY] = [
      frame[0][0] - form[0][0],
      frame[0][1] - form[0][1],
    ];

    return frame.every(([x1, y1], i) => {
      const [x2, y2] = form[i];

      return x1 - x2 === offsetX && y1 - y2 === offsetY;
    });
  });
}

describe('match', () => {
  it('same block', () => {
    const frame = [[0, 0], [0, 1], [1, 0]];
    const block = [[0, 0], [0, 1], [1, 0]];

    expect(match(frame, block)).toBeTruthy();
  });

  it('same block with offset', () => {
    const frame = [[1, 1], [1, 2], [2, 1]];
    const block = [[0, 0], [0, 1], [1, 0]];

    expect(match(frame, block)).toBeTruthy();
  });

  it('1 length block', () => {
    const frame = [[5, 2]];
    const block = [[0, 4]];

    expect(match(frame, block)).toBeTruthy();
  });
});

function solution(board, table) {
  const frames = takeFrames(board);
  const blocks = takeBlocks(table);

  let count = 0;

  blocks.forEach((block) => {
    const found = frames.findIndex((frame) => match(frame, block));

    if (found > -1) {
      frames.splice(found, 1);
      count += block.length;
    }
  });

  return count;
}

test('sample', () => {
  expect(solution([
    [1, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0],
  ],
  [
    [1, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0],
  ])).toBe(14);
});
