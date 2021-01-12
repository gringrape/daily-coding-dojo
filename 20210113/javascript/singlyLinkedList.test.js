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
