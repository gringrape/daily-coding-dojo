function pickBlocksAround(i, j, arr) {
  return [[0, 0], [0, 1], [1, 0], [1, 1]]
    .map(([diffI, diffJ]) => arr[i + diffI][j + diffJ]);
}

test('pickBlocksAround', () => {
  expect(pickBlocksAround(0, 0, [
    'ABAC',
    'CCAB',
  ])).toEqual(['A', 'B', 'C', 'C']);
});

function isSameBlocks(blocks) {
  const firstBlock = blocks[0];

  return firstBlock !== 0 && blocks.every((block) => block === firstBlock);
}

test('isSameBlocks', () => {
  expect(isSameBlocks(['A', 'A', 'A', 'A'])).toBeTruthy();
  expect(isSameBlocks(['A', 'A', 'A', 'B'])).toBeFalsy();
  expect(isSameBlocks([0, 0, 0, 0])).toBeFalsy();
});

const equalsToOR = (target, ...args) => args
  .reduce((predicate, arg) => predicate || target === arg, false);

function deleteBlocksInARow(i, str) {
  return [...str]
    .map((el, idx) => (equalsToOR(idx, i, i + 1) ? 0 : el))
    .join('');
}

test('deleteBlocksInARow', () => {
  expect(deleteBlocksInARow(0, 'AABB')).toBe('00BB');
});

function deleteBlocksAround(i, j, board) {
  return board
    .map((row, r) => (equalsToOR(r, i, i + 1) ? deleteBlocksInARow(j, row) : row));
}

test('deleteBlocksAround', () => {
  expect(deleteBlocksAround(0, 0, [
    'AABB',
    'AACC',
  ])).toEqual([
    '00BB',
    '00CC',
  ]);
});
