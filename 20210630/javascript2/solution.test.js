test('test works', () => {
  expect(1 + 1).toBe(2);
});

const positions = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [2, 0],
  8: [2, 1],
  9: [2, 2],
  '*': [3, 0],
  0: [3, 1],
  '#': [3, 2],
};

function distance(p1, p2) {
  const [x1, y1] = positions[p1];
  const [x2, y2] = positions[p2];

  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

test('distance', () => {
  expect(distance('*', 0)).toBe(1);
  expect(distance('*', 5)).toBe(3);
  expect(distance('#', 2)).toBe(4);
});

function solution(numbers, preferHand) {
  const leftNumbers = new Set([1, 4, 7]);
  const rightNumbers = new Set([3, 6, 9]);

  const handPosition = {
    L: '*',
    R: '#',
  };

  const nearHand = (number) => {
    const { L: positionL, R: positionR } = handPosition;
    const [distanceL, distanceR] = [positionL, positionR]
      .map((p) => distance(p, number));

    if (distanceL > distanceR) {
      return 'R';
    }

    if (distanceL < distanceR) {
      return 'L';
    }

    return {
      left: 'L',
      right: 'R',
    }[preferHand];
  };

  const push = (number) => {
    if (leftNumbers.has(number)) {
      handPosition.L = number;
      return 'L';
    }

    if (rightNumbers.has(number)) {
      handPosition.R = number;
      return 'R';
    }

    const hand = nearHand(number);
    handPosition[hand] = number;
    return hand;
  };

  return numbers
    .map(push)
    .join('');
}

test('1, 4, 7', () => {
  expect(solution([1, 1, 4, 7])).toBe('LLLL');
});

test('3, 6, 9', () => {
  expect(solution([3, 3, 6, 9])).toBe('RRRR');
});

test('left and rigth numbers', () => {
  expect(solution([3, 1, 3, 6, 7, 9])).toBe('RLRRLR');
});

test('samples', () => {
  expect(solution(
    [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5],
    'right',
  )).toBe('LRLLLRLLRRL');

  expect(solution(
    [7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2],
    'left',
  )).toBe('LRLLRRLLLRR');

  expect(solution(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    'right',
  )).toBe('LLRLLRLLRL');
});
