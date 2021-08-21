function solution(code) {
  const stack = [];
  const startBlock = {};
  stack.push(startBlock);

  const prints = [];

  code.forEach((command) => {
    // 블록 생성 및 삭제
    const dots = (command.match(/[.]+/) || [''])[0];
    const blockNumber = dots.length + 1;

    if (blockNumber > stack.length) {
      while (stack.length !== blockNumber) {
        const obj = {};
        stack.push((obj));
      }
    }

    if (blockNumber < stack.length) {
      while (stack.length !== blockNumber) {
        stack.pop();
      }
    }

    // 출력
    if (command.includes('print ')) {
      const varName = command.split(/[.]*print /).filter((i) => i)[0];

      const stackRerversed = stack.slice(0).reverse();
      const block = stackRerversed.find((b) => b[varName] !== undefined);

      if (!block) {
        prints.push('error');
        return;
      }

      prints.push(`${varName}=${block[varName]}`);

      return;
    }

    // 변수 생성 및 값 대입
    // TODO: block 변경
    const block = stack[stack.length - 1];
    const { variable, number } = command.match(/^(?<blocks>[.]*)(?<variable>[a-z])=(?<number>[0-9]*)/).groups;

    block[variable] = number;
  });

  return prints;
}

// test('simple - without block', () => {
//   expect(solution(['a=3', 'print a', '.a=6', '.print a'])).toEqual(['a=3', 'a=6']);
// });

test('sample - without block', () => {
  expect(solution(['a=3', '..a=4', '..b=3', '..print a', '.......a=6', '.......print a', '.......print b', '..print a', '....a=7', '....print a', 'print a', 'print b', 'a=4', 'print a', '...print a']))
    .toEqual(['a=4', 'a=6', 'b=3', 'a=4', 'a=7', 'a=3', 'error', 'a=4', 'a=4']);
});
