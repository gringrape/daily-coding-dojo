// doubly linked list 를 구현하자
class Node {
  constructor(number, prev, next) {
    this.number = number;
    this.prev = prev;
    this.next = next;
  }
}

function range(n) {
  return Array(n).fill().map((_, i) => i + 1);
}

function makeList(n) {
  const head = new Node(0);

  let current = head;

  range(n - 1).forEach((i) => {
    const temp = new Node(i);

    temp.prev = current;
    current.next = temp;

    current = temp;
  });

  return head;
}

test('doubly linked list', () => {
  const head = makeList(5);

  expect(head.number).toBe(0);
  expect(head.next.next.number).toBe(2);
  expect(head.next.next.next.next.number).toBe(4);
  expect(head.next.prev.number).toBe(0);
});

function solution(n, k, commands) {
  const status = range(n).fill('O');
  const deleted = [];

  const head = makeList(n);

  const moveDown = (node, x) => range(x)
    .reduce((cur) => cur.next, node);

  const moveUp = (node, x) => range(x)
    .reduce((cur) => cur.prev, node);

  const remove = (node) => {
    const { prev: prevNode, next: nextNode } = node;

    status[node.number] = 'X';
    deleted.push(node);

    if (!nextNode) {
      prevNode.next = null;
      return prevNode;
    }

    if (!prevNode) {
      nextNode.prev = null;
      return nextNode;
    }

    nextNode.prev = prevNode;
    prevNode.next = nextNode;

    return nextNode;
  };

  const restore = (node) => {
    const lastDeleted = deleted.pop();
    const { prev: prevNode, next: nextNode, number } = lastDeleted;

    if (prevNode) {
      prevNode.next = lastDeleted;
    }

    if (nextNode) {
      nextNode.prev = lastDeleted;
    }

    status[number] = 'O';

    return node;
  };

  let current = moveDown(head, k);

  commands.forEach((command) => {
    const type = command[0];
    const offset = +command.slice(2);

    current = {
      D: moveDown,
      U: moveUp,
      C: remove,
      Z: restore,
    }[type](current, offset);
  });

  return status.join('');
}

test('without revive', () => {
  expect(solution(4, 0, ['D 2', 'U 2', 'D 2', 'C'])).toBe('OOXO');
  expect(solution(5, 1, ['D 2', 'C', 'U 2', 'D 2', 'C'])).toBe('OOOXX');
});

test('with revive', () => {
  expect(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']))
    .toBe('OOOOXOOO');
  expect(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z', 'U 1', 'C']))
    .toBe('OOXOXOOO');
});
