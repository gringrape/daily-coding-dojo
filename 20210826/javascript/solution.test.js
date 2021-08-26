// 특정 조건을 만족하는 최소 지점을 찾는 이진 탐색
function binarySearch(low, high, condition) {
  const mid = Math.floor((low + high) / 2);

  if (low > high) {
    return low;
  }

  if (condition(mid)) {
    return binarySearch(low, mid - 1, condition);
  }

  return binarySearch(mid + 1, high, condition);
}

test('test works', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(binarySearch(
    0, 9,
    (i) => array[i] > 3,
  )).toBe(3);

  expect(binarySearch(
    0, 9,
    (i) => array[i] > 6,
  )).toBe(6);
});

// TODO: 특정 '시간'에 '모든 사람이 심사'를 완료할 수 있는지 여부를 반환하는 함수
