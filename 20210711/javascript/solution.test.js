test('test works', () => {
  expect(1 + 1).toBe(2);
});

function solution(x) {
  const transform = (s) => {
    const numbers = s.split('');
    let start = 0;

    while (true) {
      const indexOf111 = numbers.slice(start).findIndex((_, i, arr) => (
        arr[i] === '1'
        && arr[i + 1] === '1'
        && arr[i + 2] === '1'
      ));

      const indexOf0 = numbers.slice(start + indexOf111 + 2).findIndex((n) => n === '0');

      if (indexOf0 < 0 || indexOf111 < 0) {
        break;
      }

      numbers[start + indexOf111 + 2] = '0';
      numbers[start + indexOf111 + 2 + indexOf0] = '1';

      start += indexOf111 + 3;
    }

    return numbers.join('');
  };

  return x.map(transform);
}

test('sample', () => {
  expect(solution([
    '1110',
    '100111100',
    '0111111010',
  ])).toEqual([
    '1101',
    '100110110',
    '0110110111',
  ]);
});
