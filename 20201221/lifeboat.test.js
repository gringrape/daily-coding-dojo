const binarySearch = (arr, el) => {
  const n = arr.length;
  let low = -1;
  let high = n;
  let mid;

  while (low + 1 < high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] <= el) {
      low = mid;
    } else {
      high = mid;
    }
    console.log(mid);
  }

  return high;
};

test('binarySearch', () => {
  expect(binarySearch([40, 50, 70, 80], 70)).toBe(3);
});

function solution(people, limit) {
  const sorted = people.sort((a, b) => a - b);

  let count = 0;
  while (sorted.length > 0) {
    const [first] = sorted;

    const secondIndex = binarySearch(sorted, limit - first) - 1;

    if (secondIndex === sorted.length - 1) {
      sorted.pop();
    } else if (secondIndex > 0) {
      sorted.splice(secondIndex, 1);
    }

    sorted.shift();
    count += 1;
  }

  return count;
}

test('solution', () => {
  expect(solution([], 100)).toBe(0);
  expect(solution([100], 100)).toBe(1);
  expect(solution([100, 100], 100)).toBe(2);
  expect(solution([40, 40], 100)).toBe(1);
  expect(solution([70, 80, 50], 100)).toBe(3);
  expect(solution([40, 40, 80, 80], 140)).toBe(2);
  expect(solution([70, 50, 80, 50], 100)).toBe(3);
});
