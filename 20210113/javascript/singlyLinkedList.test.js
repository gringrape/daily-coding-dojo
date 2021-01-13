const Node = require('./node.test');

class SinglyLinkedList {
  constructor(...args) {
    this.size = args.length;
    this.head = null;

    if (args.length > 0) {
      this.setNodes(...args);
    }
  }

  setNodes(...values) {
    this.head = new Node(values[0]);
    let current = this.head;
    values.slice(1).forEach((value) => {
      current.next = new Node(value);
      current = current.next;
    });
  }
}

describe('Singly Linked List', () => {
  test('size', () => {
    expect(new SinglyLinkedList(1).size).toBe(1);
  });

  test('head', () => {
    expect(new SinglyLinkedList().head).toBeNull();
    expect(new SinglyLinkedList(1).head.value).toBe(1);
  });

  test('set nodes', () => {
    const { head } = new SinglyLinkedList(1, 2, 3);
    expect(head.value).toBe(1);
    expect(head.next.value).toBe(2);
  });
});

function getMiddle(array) {
  const go = (walker, runner) => {
    if (!runner?.next) {
      return walker.value;
    }
    return go(walker.next, runner.next.next);
  };

  const { head } = new SinglyLinkedList(...array);

  return go(head, head.next);
}

test('getMiddle', () => {
  expect(getMiddle([1])).toBe(1);
  expect(getMiddle([1, 2])).toBe(1);
  expect(getMiddle([1, 2, 3])).toBe(2);
  expect(getMiddle([1, 2, 3, 4])).toBe(2);
  expect(getMiddle([1, 2, 3, 4, 5])).toBe(3);
});
