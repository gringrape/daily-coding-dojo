// 1. 주어진것
// 정수배열
// 2. 구하는 것
// 두개의 수를 뽑아 더해서 만들 수 있는 모든 수의 배열
// 3. 조건
// - numbers 의 길이는 2 이상 100 이하
// - numbers 의 모든 수는 0 이상 100 이하
// - 오름차순으로 정렬한다
// 4. 
//  계획1- Set 을 이용한다
//  합을 set 자료 구조에 넣고 배열로 다시 바꾸어 반환한다.
// 4-1.
// 1, 2 가 주어질때, 합은 3 이다

// 잘 안된다.
// 문제를 자르자. 
// 1. 하나의 수와 배열에 있는 수의 합을 배열로
// 2. 하나의 배열에 있는 수 중에서 두수를 뽑아 합으로
// 3. 두수에서 중복을 제거

function addANumberToArray(num, arr) {
  return arr.map(el => el + num);
}

function takeTwoAndSum(arr) {
  return arr
    .flatMap((num, idx) => addANumberToArray(num, arr.slice(idx + 1)))
    .sort((a, b) => a - b);
}

function solution(arr) {
  return [...new Set(takeTwoAndSum(arr))];
}

module.exports = {
  addANumberToArray,
  takeTwoAndSum,
  solution,
}
