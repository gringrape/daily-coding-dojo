// const solveOneCommand = (array) => (command) => {
//   const [i, j, k] = command;
    
//   return array
//     .slice(i - 1, j)
//     .sort((a, b) => a - b)[k - 1];
// }

// function solution(array, commands) {
//   const f = solveOneCommand(array);

//   return commands.map(f);
// }

const cutFrom = (i) => (arr) => arr.slice(i - 1);
const cutTo = (j) => (arr) => arr.slice(0, j + 1);
const sortInc = (arr) => arr.sort((a, b) => a - b);
const pick = (k) => (arr) => arr[k - 1];

function solution(arr, commands) {
  return commands
    .map(([i, j, k]) => [
      cutFrom(i),
      cutTo(j - i),
      sortInc,
      pick(k)
    ])
    .map(([f1, f2, f3, f4]) => f4(f3(f2(f1(arr)))));
}

module.exports = {
  solution,
}

// 이렇게 하고 싶었는데. 함수형 언어가 필요. 
