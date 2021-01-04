function getHourAndMinute(time) {
  return time.split(':').map((str) => parseInt(str, 10));
}

function calTimeDiff(before, later) {
  const [hourA, minuteA, hourB, minuteB] = [before, later].flatMap(getHourAndMinute);
  if (hourA > hourB || (hourB === hourA && minuteA > minuteB)) {
    return (24 - hourA) * 60 - minuteA;
  }

  return (hourB - hourA) * 60 + minuteB - minuteA;
}

test('calTimeDiff', () => {
  expect(calTimeDiff('10:00', '10:01')).toBe(1);
  expect(calTimeDiff('10:00', '10:10')).toBe(10);
  expect(calTimeDiff('10:00', '11:10')).toBe(70);
  expect(calTimeDiff('10:20', '11:10')).toBe(50);
  expect(calTimeDiff('23:50', '00:10')).toBe(10);
  expect(calTimeDiff('23:50', '1:10')).toBe(10);
  expect(calTimeDiff('10:05', '10:00')).toBe(835);
});

function checkSong(m, played) {
  return played.split(`${m}#`).join('').includes(m);
}

test('checkSong', () => {
  expect(checkSong('A', 'A')).toBeTruthy();
  expect(checkSong('A', 'A#')).toBeFalsy();
  expect(checkSong('A', 'A#A')).toBeTruthy();
});

function getActualPlayed(period, melody, i = 0, result = '') {
  const idx = i % melody.length;
  const current = melody[idx];

  if (period === 0) {
    return (current === '#') ? result.concat(current) : result;
  }

  return (current === '#')
    ? getActualPlayed(period, melody, i + 1, result.concat(current))
    : getActualPlayed(period - 1, melody, i + 1, result.concat(current));
}

test('getActualPlayed', () => {
  expect(getActualPlayed(3, 'A')).toBe('AAA');
  expect(getActualPlayed(3, 'AB')).toBe('ABA');
  expect(getActualPlayed(4, 'A#B#')).toBe('A#B#A#B#');
  expect(getActualPlayed(1, 'A#B#')).toBe('A#');
  expect(getActualPlayed(2, 'A#B#C#F')).toBe('A#B#');
});

function solution(m, musicInfos, i = 0, founds = []) {
  if (i === musicInfos.length) {
    return (founds.length === 0)
      ? '(None)'
      : founds.sort((a, b) => b[1] - a[1])[0][0];
  }

  const [start, end, title, melody] = musicInfos[i].split(',');
  const actualPlayed = getActualPlayed(calTimeDiff(start, end), melody);

  if (checkSong(m, actualPlayed)) {
    return solution(m, musicInfos, i + 1, [...founds, [title, calTimeDiff(start, end)]]);
  }

  return solution(m, musicInfos, i + 1, founds);
}

test('simple', () => {
  expect(solution('A', ['10:00,10:01,HELLO,A'])).toBe('HELLO');

  expect(solution('A', [
    '10:00,10:01,HELLO,B',
    '10:00,10:01,HALLO,A',
  ])).toBe('HALLO');

  expect(solution('A', [
    '10:00,10:01,HELLO,B',
    '10:00,10:01,HALLO,C',
    '10:00,10:01,HILLO,A',
  ])).toBe('HILLO');
});

test('not found', () => {
  expect(solution('F', [
    '10:00,10:01,HELLO,B',
    '10:00,10:01,HALLO,C',
    '10:00,10:01,HILLO,A',
  ])).toBe('(None)');
});

test('multiple founds', () => {
  expect(solution('A', [
    '10:00,10:01,HELLO,B',
    '10:00,10:05,HILLO,A',
    '10:00,10:01,HALLOO,A',
  ])).toBe('HILLO');

  expect(solution('A', [
    '10:00,10:06,HELLO,B',
    '10:00,10:05,HELLOC,A',
    '10:00,10:06,HALLOO,A',
  ])).toBe('HALLOO');
});

test('sample', () => {
  expect(solution('ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF'])).toBe('HELLO');
  expect(solution('ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF'])).toBe('WORLD');
  expect(solution('ABC', ['00:00,00:05,HI,ABC#ABC'])).toBe('(None)');
  expect(solution('ABC', ['00:00,00:06,HI,ABC#ABC'])).toBe('HI');
});
