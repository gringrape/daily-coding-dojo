test('test works', () => {
  expect(1 + 1).toBe(2);
});

function move(position) {
  const [
    [r1, c1], [r2, c2],
  ] = position;

  const horizontal = r1 === r2;

  const parallelMoves = horizontal
    ? [[0, 1, 0, 1], [0, -1, 0, -1]]
    : [[1, 0, 1, 0], [-1, 0, -1, 0]];

  const rotationalMoves = horizontal
    ? [
      [],
      [],
      [],
      [],
    ]
    : [
      [],
      [],
      [],
      [],
    ];

  return [
    ...parallelMoves, ...rotationalMoves,
  ].map(([dr1, dc1, dr2, dc2]) => [
    r1 + dr1, c1 + dc1,
    r2 + dr2, c2 + dc2,
  ]);
}

function solution(board) {
  const N = board.length;

  const reached = (position) => position
    .some(([x, y]) => x === N - 1 && y === N - 1);

  const initialPosition = [
    [0, 0],
    [0, 1],
  ];

  const position = move(initialPosition)[0];

  // const position = [
  //   [0, 1],
  //   [1, 1],
  // ];

  // TODO: 위치 업데이트, 방문 기록, 다음 순회, 순회 종료

  if (reached(position)) {
    return 1;
  }

  return 0;
}

test('simple', () => {
  expect(solution([
    [0, 0],
    [0, 0],
  ])).toBe(1);
});
