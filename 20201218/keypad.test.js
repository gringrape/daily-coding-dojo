const buttons = {
  1: {
    hand: 'L',
    position: [0, 0],
  },
  3: {
    hand: 'R',
    position: [2, 0],
  },
  4: {
    hand: 'L',
    position: [0, 1],
  },
  6: {
    hand: 'R',
    position: [2, 1],
  },
  7: {
    hand: 'L',
    position: [0, 2],
  },
  9: {
    hand: 'R',
    position: [2, 2],
  },
  2: {
    hand: '',
    position: [1, 0],
  },
  5: {
    hand: '',
    position: [1, 1],
  },
  8: {
    hand: '',
    position: [1, 2],
  },
  0: {
    hand: '',
    position: [1, 3],
  },
  '*': {
    hand: '',
    position: [0, 3],
  },
  '#': {
    hand: '',
    position: [2, 3],
  },
};

const calculateDistance = (point1) => (point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  return [x2 - x1, y2 - y1].map(Math.abs).reduce((acc, curr) => acc + curr, 0);
};

test('calculateDistance', () => {
  expect(calculateDistance([1, 1])([2, 3])).toBe(3);
  expect(calculateDistance([1, 1])([1, 5])).toBe(4);
});

function findHand(number, current, useHand) {
  const { hand } = buttons[number];

  if (hand) {
    return hand;
  }

  const getPosition = (num) => buttons[num].position;

  const numberPositon = getPosition(number);

  const [distanceFromLeft, distanceFromRight] = current
    .map(getPosition)
    .map(calculateDistance(numberPositon));

  if (distanceFromLeft === distanceFromRight) {
    return useHand[0].toUpperCase();
  }

  return distanceFromLeft < distanceFromRight ? 'L' : 'R';
}

test('findHand', () => {
  expect(findHand(2, ['1', '#'])).toBe('L');
  expect(findHand(2, ['7', '3'])).toBe('R');
  expect(findHand(2, ['5', '6'])).toBe('L');
  expect(findHand(1, ['*', '3'])).toBe('L');
  expect(findHand(2, ['1', '3'], 'left')).toBe('L');
  expect(findHand(2, ['1', '3'], 'right')).toBe('R');
  expect(findHand(8, ['5', '3'], 'right')).toBe('L');
});

function solution(numbers, hand, current = ['*', '#']) {
  if (numbers.length === 0) {
    return '';
  }

  const currentHand = findHand(numbers[0], current, hand);

  const indexs = {
    L: 0,
    R: 1,
  };

  const updatedPosition = current
    .map((num, idx) => (idx === indexs[currentHand] ? numbers[0] : num));

  return [
    currentHand,
    ...solution(numbers.slice(1), hand, updatedPosition),
  ].join('');
}

describe('solution', () => {
  test('side buttons', () => {
    expect(solution([1])).toBe('L');
    expect(solution([1, 1])).toBe('LL');
    expect(solution([1, 4])).toBe('LL');
    expect(solution([1, 9, 4, 3])).toBe('LRLR');
  });

  test('middle', () => {
    expect(solution([1, 2, 2, 2, 2], 'left')).toBe('LLLLL'); // 왼손에서 가까움
    expect(solution([3, 2, 0], 'left')).toBe('RRL'); // 왼손에서 가까움
    expect(solution([2], 'left')).toBe('L'); // 왼손에서 가까움
    expect(solution([2], 'right')).toBe('R'); // 왼손에서 가까움
    expect(solution([5], 'right')).toBe('R'); // 왼손에서 가까움
    expect(solution([5], 'left')).toBe('L'); // 왼손에서 가까움
    expect(solution([0], 'left')).toBe('L'); // 왼손에서 가까움
    expect(solution([0], 'right')).toBe('R'); // 왼손에서 가까움
    expect(solution([2, 2], 'right')).toBe('RR'); // 왼손에서 가까움
  });

  test('example', () => {
    expect(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right')).toBe('LRLLLRLLRRL'); // 왼손에서 가까움
  });
});
