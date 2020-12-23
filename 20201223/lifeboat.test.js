function solution(people, limit) {
  people.sort((a, b) => b - a);
  let count = 0;
  while (people.length) {
    if (people[0] + people[people.length - 1] <= limit) {
      people.shift();
      people.pop();
    } else {
      people.shift();
    }
    count += 1;
  }
  return count;
}

test('solution', () => {
  expect(solution([100], 120)).toBe(1);
  expect(solution([100, 100], 100)).toBe(2);
  expect(solution([40, 40], 100)).toBe(1);
  expect(solution([70, 80, 50], 100)).toBe(3);
  expect(solution([40, 60, 80, 80], 140)).toBe(2);
  expect(solution([70, 50, 80, 50], 100)).toBe(3);
  expect(solution([70, 50, 80, 50, 60], 100)).toBe(4);
  expect(solution([50, 70, 80, 50, 60], 80)).toBe(5);
});
