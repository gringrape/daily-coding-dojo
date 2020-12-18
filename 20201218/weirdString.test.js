function splitByBlanks(str) {
  return str.split(/(\s+)/).filter((s) => s !== '');
}

test('splitByBlanks', () => {
  expect(splitByBlanks(' Hello    world  ')).toEqual([' ', 'Hello', '    ', 'world', '  ']);
});

function solution(str) {
  const convert = (word) => [...word]
    .map((char, idx) => ((idx % 2 === 0) ? char.toUpperCase() : char.toLowerCase()))
    .join('');

  return splitByBlanks(str)
    .map((word) => (word ? convert(word) : word))
    .join('');
}

test('solution', () => {
  expect(solution('  try hello  world   ')).toBe('  TrY HeLlO  WoRlD   ');
});
