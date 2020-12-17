const { addANumberToArray, takeTwoAndSum, solution } = require('./src');

describe('addNumberToArray', () => {
	test('1 and [1, 2] returns [2, 3]', () => {
		expect(addANumberToArray(1, [ 1, 2 ])).toEqual([ 2, 3 ]);
	});

	test('5 and [2, 5, 6] returns [7, 10, 11]', () => {
		expect(addANumberToArray(1, [ 1, 2 ])).toEqual([ 2, 3 ]);
	});
});

describe('takeTwoAndSum', () => {
	test('[1, 2, 3] makes [3, 4, 5]', () => {
		expect(takeTwoAndSum([ 1, 2, 3 ])).toEqual([ 3, 4, 5 ]);
	});

	test('[3, 5, 7] makes [8, 10, 12]', () => {
		expect(takeTwoAndSum([ 1, 2, 3 ])).toEqual([ 3, 4, 5 ]);
	});
});

test('solution', () => {
  expect(solution([2, 1, 3, 4, 1])).toEqual([2, 3, 4, 5, 6, 7]);
  expect(solution([5, 0, 2, 7])).toEqual([2, 5, 7, 9, 12]);
})
