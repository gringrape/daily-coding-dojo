function generate(radix, count) {
  return Array(count).fill()
    .flatMap((_, i) => [...i.toString(radix).toUpperCase()])
    .slice(0, count);
}

describe('generate', () => {
  context('with count less than 10', () => {
    it('generates using radix and count', () => {
      expect(generate(10, 4)).toEqual([
        '0', '1', '2', '3',
      ]);
    });
  });

  context('with count greater than 10', () => {
    it('generates using radix and count', () => {
      expect(generate(10, 11)[10]).toBe('1');
      expect(generate(10, 11).length).toBe(11);
    });
  });

  context('with radix 16', () => {
    it('generates using radix and count', () => {
      expect(generate(16, 11)[10]).toBe('A');
    });
  });
});

function solution(n, t, m, p) {
  return generate(n, m * t)
    .filter((_, i) => i % m === p - 1)
    .join('');
}

test('solution', () => {
  expect(solution(2, 4, 2, 1)).toBe('0111');
  expect(solution(16, 16, 2, 1)).toBe('02468ACE11111111');
  expect(solution(16, 16, 2, 2)).toBe('13579BDF01234567');
});
