class Player {
  constructor(number) {
    this.number = number;
    this.parents = new Set();
    this.children = new Set();
  }

  win(other) {
    this.parents.add(other);
  }

  lose(other) {
    this.children.add(other);
  }
}

function searchAllParents(player, parent = player, visited = new Set()) {
  if (visited.has(parent)) {
    return;
  }

  visited.add(parent);

  parent.parents.forEach((grandParent) => {
    player.win(grandParent);
    searchAllParents(player, grandParent, visited);
  });
}

function searchAllChildren(player, child = player, visited = new Set()) {
  if (visited.has(child)) {
    return;
  }

  visited.add(child);

  child.children.forEach((grandChild) => {
    player.lose(grandChild);
    searchAllChildren(player, grandChild, visited);
  });
}

function solution(n, records) {
  const players = [...Array(n + 1)].map((_, i) => new Player(i));

  records.forEach((record) => {
    const [winner, loser] = record.map((i) => players[i]);

    winner.win(loser);
    loser.lose(winner);
  });

  searchAllParents(players[1]);

  players.forEach((player) => {
    searchAllParents(player);
    searchAllChildren(player);
  });

  return players.filter((player) => {
    const { parents, children } = player;

    return parents.size + children.size === n - 1;
  }).length;
}

test('sample', () => {
  expect(solution(5, [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]])).toBe(2);
});
