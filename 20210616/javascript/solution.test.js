function move([x, y], direction) {
  const outOfBoundary = (i, j) => i < -5 || i > 5 || j < -5 || j > 5;

  const [dx, dy] = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1],
  }[direction];

  const [nextX, nextY] = [x + dx, y + dy];

  if (outOfBoundary(nextX, nextY)) {
    return [x, y];
  }

  return [nextX, nextY];
}

function solution(dirs) {
  const reducer = (state, direction) => {
    const { uniquePoints, current } = state;

    const [x, y] = current;
    const [nextX, nextY] = move(current, direction);

    if (x === nextX && y === nextY) {
      return state;
    }

    uniquePoints.add(`${x + nextX},${y + nextY}`);

    return {
      uniquePoints,
      current: [nextX, nextY],
    };
  };

  const initialState = {
    uniquePoints: new Set(),
    current: [0, 0],
  };

  return [...dirs].reduce(reducer, initialState).uniquePoints.size;
}

(() => {
  test('test is working', () => {
    expect(1 + 1).toBe(2);
  });

  describe('move', () => {
    it('moves point according to the direction', () => {
      expect(move([0, 0], 'L')).toEqual([-1, 0]);
      expect(move([0, 1], 'R')).toEqual([1, 1]);
      expect(move([3, 2], 'U')).toEqual([3, 3]);
      expect(move([3, 2], 'D')).toEqual([3, 1]);
    });

    it('doesn`t move point if destination is out of boundary', () => {
      expect(move([5, 5], 'R')).toEqual([5, 5]);
      expect(move([5, 5], 'U')).toEqual([5, 5]);
    });
  });

  test('solution', () => {
    expect(solution('ULURRDLLU')).toBe(7);
    expect(solution('LULLLLLLU')).toBe(7);
  });
})();
