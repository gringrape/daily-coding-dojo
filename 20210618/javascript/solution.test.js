test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function solution(newId) {
  const result = newId
    .toLowerCase()
    .replace(/[^0-9a-z-_.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/, '')
    .replace(/^$/, 'a')
    .slice(0, 15)
    .replace(/\.$/, '');

  return result
    .padEnd(3, result.slice(-1));
}

test('solution', () => {
  // # step1.
  // expect(solution('...!@BaT#*..y.abcdefghijklm'))
  //   .toBe('...!@bat#*..y.abcdefghijklm');

  // # step2.
  // expect(solution('...!@BaT#*..y.abcdefghijklm'))
  //   .toBe('...bat..y.abcdefghijklm');

  // # step3.
  // expect(solution('...!@BaT#*..y.abcdefghijklm'))
  //   .toBe('.bat.y.abcdefghijklm');

  // # step4.
  // expect(solution('.!@BaT#*..y.abcdefghijklm'))
  //   .toBe('bat.y.abcdefghijklm');
  // expect(solution('!@BaT#*..y.abcdefghijklm.'))
  //   .toBe('bat.y.abcdefghijklm');

  // # step5.
  // expect(solution(''))
  //   .toBe('a');

  // # step6.
  // expect(solution('bat.y.abcdefghijklm'))
  //   .toBe('bat.y.abcdefghi');

  // # step7.
  expect(solution('=.='))
    .toBe('aaa');
});
