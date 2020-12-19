function makeTriangle(n) {
  if (n < 2) {
    return null;
  }

  return Array(n)
    .fill()
    .map((_, i) => Array(i + 1).fill(0));
}

test('makeTriangle', () => {
  expect(makeTriangle(2)).toEqual([
    [0],
    [0, 0],
  ]);

  expect(makeTriangle(3)).toEqual([
    [0],
    [0, 0],
    [0, 0, 0],
  ]);

  expect(makeTriangle(1)).toEqual(null);
});

function go({
  direction, startPoint, startNumber, distance, triangle,
}) {
  if (distance === 0) {
    return ({
      endPoint: startPoint,
      endNumber: startNumber,
      triangle,
    });
  }

  const [i, j] = startPoint;
  const updatedPoint = {
    DOWN: [i + 1, j],
    RIGHT: [i, j + 1],
    UPLEFT: [i - 1, j - 1],
  }[direction];

  // 부수효과를 사용하지 않으면 에러 발생
  const updatedTriangle = triangle
    .map((row, r) => row.map((num, c) => ((r === i && c === j) ? startNumber : num)));

  return go({
    direction,
    startPoint: updatedPoint,
    startNumber: startNumber + 1,
    distance: distance - 1,
    triangle: updatedTriangle,
  });
}

describe('go', () => {
  const triangle1 = [
    [0],
    [0, 0],
    [0, 0, 0],
  ];

  const triangle2 = [
    [0],
    [0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
  ];

  test('goDown', () => {
    expect(go({
      direction: 'DOWN',
      startPoint: [0, 0],
      startNumber: 1,
      distance: 2,
      triangle: triangle1,
    }).triangle).toEqual([
      [1],
      [2, 0],
      [0, 0, 0],
    ]);

    expect(go({
      direction: 'DOWN',
      startPoint: [1, 1],
      startNumber: 9,
      distance: 1,
      triangle: triangle2,
    }).triangle).toEqual([
      [0],
      [0, 9],
      [0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  test('goRight', () => {
    expect(go({
      direction: 'RIGHT',
      startPoint: [2, 0],
      startNumber: 1,
      distance: 2,
      triangle: triangle1,
    }).triangle).toEqual([
      [0],
      [0, 0],
      [1, 2, 0],
    ]);

    expect(go({
      direction: 'RIGHT',
      startPoint: [3, 0],
      startNumber: 9,
      distance: 3,
      triangle: triangle2,
    }).triangle).toEqual([
      [0],
      [0, 0],
      [0, 0, 0],
      [9, 10, 11, 0],
    ]);
  });

  test('goUpLeft', () => {
    expect(go({
      direction: 'UPLEFT',
      startPoint: [2, 2],
      startNumber: 1,
      distance: 2,
      triangle: triangle1,
    }).triangle).toEqual([
      [0],
      [0, 2],
      [0, 0, 1],
    ]);

    expect(go({
      direction: 'UPLEFT',
      startPoint: [3, 3],
      startNumber: 9,
      distance: 3,
      triangle: triangle2,
    }).triangle).toEqual([
      [0],
      [0, 11],
      [0, 0, 10],
      [0, 0, 0, 9],
    ]);
  });
});

function makeMovePlan(n) {
  const distances = Array(n - 1).fill()
    .map((_, i) => i + 1)
    .reverse();

  const directionPattern = ['DOWN', 'RIGHT', 'UPLEFT'];

  const directions = Array(n + 1).fill()
    .map((_, i) => directionPattern[i % directionPattern.length]);

  return {
    distances: [n - 1, ...distances, 1],
    directions,
  };
}

test('makeMovePlan', () => {
  expect(makeMovePlan(4)).toEqual({
    distances: [3, 3, 2, 1, 1],
    directions: ['DOWN', 'RIGHT', 'UPLEFT', 'DOWN', 'RIGHT'],
  });

  expect(makeMovePlan(6)).toEqual({
    distances: [5, 5, 4, 3, 2, 1, 1],
    directions: ['DOWN', 'RIGHT', 'UPLEFT', 'DOWN', 'RIGHT', 'UPLEFT', 'DOWN'],
  });
});

function solution(
  n,
  triangle = makeTriangle(n),
  directions = makeMovePlan(n).directions,
  distances = makeMovePlan(n).distances,
  startPoint = [0, 0],
  startNumber = 1,
) {
  if (n === 1) {
    return [1];
  }

  if (directions.length === 0) {
    return triangle.flatMap((row) => row);
  }

  const direction = directions[0];
  const distance = distances[0];

  const { endPoint, endNumber, triangle: updated } = go({
    direction,
    distance,
    startPoint,
    startNumber,
    triangle,
  });

  return solution(
    n,
    updated,
    directions.slice(1),
    distances.slice(1),
    endPoint,
    endNumber,
  );
}

test('solution', () => {
  expect(solution(1)).toEqual([1]);
  expect(solution(4)).toEqual([1, 2, 9, 3, 10, 8, 4, 5, 6, 7]);
  expect(solution(5)).toEqual([1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]);
  expect(solution(6))
    .toEqual([1, 2, 15, 3, 16, 14, 4, 17, 21, 13, 5, 18, 19, 20, 12, 6, 7, 8, 9, 10, 11]);
});
