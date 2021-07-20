function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}

function connect(n, edges) {
  const network = new Map();

  range(0, n).map((i) => i + 1).forEach((i) => {
    network.set(i, []);
  });

  edges.forEach((nodes) => {
    const [first, second] = nodes;
    network.get(first).push(second);
    network.get(second).push(first);
  });

  return network;
}

test('connect', () => {
  expect(connect(6, [
    [3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2],
  ]).get(3).sort()).toEqual([1, 2, 4, 6]);
});

function solution(n, edges) {
  const network = connect(n, edges);
  const visited = Array(n + 1).fill(0);
  visited[1] = 1;

  const Q = [];
  Q.push([1, 1]);

  let currentDistance = 1;
  let count = 0;

  while (Q.length !== 0) {
    const [node, distance] = Q.shift();

    if (currentDistance < distance) {
      currentDistance += 1;
      count = 1;
    } else if (currentDistance === distance) {
      count += 1;
    }

    const neighbors = network.get(node);

    neighbors.forEach((neighbor) => {
      if (visited[neighbor] !== 1) {
        visited[neighbor] = 1;
        Q.push([neighbor, distance + 1]);
      }
    });
  }

  return count;
}

test('sample', () => {
  expect(solution(6, [
    [3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2],
  ])).toBe(3);
});
