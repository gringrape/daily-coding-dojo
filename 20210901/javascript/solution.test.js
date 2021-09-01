/* eslint-disable no-continue */
const plusMinutes = (time, minutes) => {
  const [hour, minute] = time.split(':').map(Number);
  const sum = minute + minutes;

  const newHour = `${hour + Math.floor(sum / 60)}`.padStart(2, '0');
  const newMinute = `${sum % 60}`.padStart(2, '0');

  return `${newHour}:${newMinute}`;
};

function solution(n, t, m, timetable) {
  // 마지막 버스가 왔을때, 대기줄에 남아있는 사람 수

  const bustimes = [...Array(n)].map((_, i) => plusMinutes('09:00', i * t));

  let start = 0;
  let people = timetable;
  let busNum = 0;
  let remain;
  while (busNum < n) {
    const bustime = bustimes[busNum];

    people = timetable.slice(start);

    const passengers = people
      .filter((time) => time <= bustime)
      .length;

    if (busNum === n - 1) {
      remain = passengers;
      break;
    }

    if (passengers <= n) {
      start += passengers;
      busNum += 1;
      continue;
    }

    start += m;
    busNum += 1;
  }

  const waitingPeople = remain;

  const last = plusMinutes('09:00', (n - 1) * t);

  if (waitingPeople < m) {
    return last;
  }

  console.log(people);

  return last;
}

test('case 1. no waiting', () => {
  expect(solution(
    10, 60, 45,
    ['23:59', '23:59', '23:59',
      '23:59', '23:59', '23:59',
      '23:59', '23:59', '23:59',
      '23:59', '23:59', '23:59',
      '23:59', '23:59', '23:59', '23:59'],
  )).toBe('18:00');
});

test('case 2. last bus with enough room', () => {
  expect(solution(
    1, 1, 5,
    ['08:00', '08:01', '08:02', '08:03'],
  )).toBe('09:00');
});

test('case 3. last bus without enough room', () => {
  expect(solution(
    1, 1, 5,
    ['00:01', '00:01', '00:01', '00:01', '00:01'],
  )).toBe('00:00');
});
