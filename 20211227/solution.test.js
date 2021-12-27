// 단계가 너무 크다
// -> 두개의 시간이 있을때 어느것이 앞인지를 먼저 알아야 할 것 같다.
//  -> native 비교가 되나? -> 문자열 비교로 충분하다.
//  -> 분으로 바꾸어서 비교를 해야 하나?

function overlap(r1, r2) {
  const { startTime: s1, endTime: e1 } = r1;
  const { startTime: s2, endTime: e2 } = r2;

  return e1 > s2 && e2 > s1;
}

test('두개의 시간 구간이 중복된다', () => {
  const s1 = {
    startTime: '10:00',
    endTime: '12:00',
  };
  const s2 = {
    startTime: '11:00',
    endTime: '13:00',
  };
  const result = overlap(s1, s2);
  expect(result).toBe(true);
});

test('두개의 시간 구간이 중복되지 않는다', () => {
  const s1 = {
    startTime: '10:00',
    endTime: '12:00',
  };
  const s2 = {
    startTime: '12:00',
    endTime: '13:00',
  };

  const result = overlap(s1, s2);
  expect(result).toBe(false);
});

function solution(...ranges) {
  const overlapOfTwo = (range1, range2) => {
    const { startTime: s1, endTime: e1 } = range1;
    const { startTime: s2, endTime: e2 } = range2;

    return e1 > s2 && e2 > s1;
  };

  return ranges.some((r1, i) => (
    ranges.slice(i + 1).some((r2) => (
      overlapOfTwo(r1, r2)
    ))
  ));
}

test('세개의 시간 구간 중 어느 두개도 중복되지 않는다', () => {
  const s1 = {
    startTime: '10:00',
    endTime: '12:00',
  };
  const s2 = {
    startTime: '12:00',
    endTime: '13:00',
  };
  const s3 = {
    startTime: '14:00',
    endTime: '15:00',
  };

  const result = solution(s1, s2, s3);

  expect(result).toBe(false);
});

test('세개의 시간 구간 중 중복된 구간이 존재한다', () => {
  const s1 = {
    startTime: '10:00',
    endTime: '12:00',
  };
  const s2 = {
    startTime: '12:00',
    endTime: '13:00',
  };
  const s3 = {
    startTime: '11:00',
    endTime: '15:00',
  };

  const result = solution(s1, s2, s3);

  expect(result).toBe(true);
});
