function convertToTwoBaseArr(number, n) {
  const parse = (num) => parseInt(num, 10);

  const converted = number.toString(2).padStart(n, '0');

  return [...converted].map(parse);
}

test('convertToTwoBaseArr', () => {
  expect(convertToTwoBaseArr(9, 5)).toEqual([0, 1, 0, 0, 1]);
  expect(convertToTwoBaseArr(9, 6)).toEqual([0, 0, 1, 0, 0, 1]);
  expect(convertToTwoBaseArr(21, 5)).toEqual([1, 0, 1, 0, 1]);
});

function mergeMaps(arr1, arr2) {
  const compare = (el1, el2) => ((el1 === 0 && el2 === 0) ? 0 : 1);

  return arr1
    .map((row, i) => row
      .map((el, j) => compare(el, arr2[i][j])));
}

test('mergeMaps', () => {
  expect(mergeMaps(
    [
      [1, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 1],
    ],
  )).toEqual([
    [1, 0],
    [1, 1],
  ]);
});

function convertToCharArr(arr) {
  return arr.map((num) => (num === 1 ? '#' : ' ')).join('');
}

test('convertToCharArr', () => {
  expect(convertToCharArr([0, 1, 0, 0, 1])).toEqual(' #  #');
  expect(convertToCharArr([1, 1, 1, 0, 1])).toEqual('### #');
});

function solution(n, arr1, arr2) {
  const [converted1, converted2] = [arr1, arr2]
    .map((arr) => arr
      .map((num) => convertToTwoBaseArr(num, n)));

  const merged = mergeMaps(converted1, converted2);

  return merged.map(convertToCharArr);
}

test('solution', () => {
  expect(solution(5,
    [9, 20, 28, 18, 11],
    [30, 1, 21, 17, 28])).toEqual(['#####', '# # #', '### #', '#  ##', '#####']);
});
