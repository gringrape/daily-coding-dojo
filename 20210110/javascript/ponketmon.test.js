function combination(comboOptions, comboLength) {
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption]);
  }

  const combos = [];
  comboOptions.forEach((currentOption, optionIndex) => {
    const smallerCombos = combination(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1,
    );

    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
}

test('combination', () => {
  expect(combination([5, 3], 1).length).toBe(2);
  expect(combination([1, 2, 3, 4, 5], 4).length).toBe(5);
});

function solution(a) {
  return Math.max(
    ...combination(a, a.length / 2)
      .map((l) => new Set(l).size),
  );
}

test('simple', () => {
  expect(solution([3, 1])).toBe(1);
  expect(solution([3, 1, 2, 3])).toBe(2);
  expect(solution([3, 3, 3, 2, 2, 4])).toBe(3);
  expect(solution([3, 3, 3, 2, 2, 2])).toBe(2);
});
