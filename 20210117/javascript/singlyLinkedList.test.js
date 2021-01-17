class Node {
  constructor(value) {
    this.value = value;
  }

  appendToTail(value, node = this) {
    if (!node.next) {
      // eslint-disable-next-line no-param-reassign
      node.next = new Node(value);
      return;
    }
    this.appendToTail(value, node.next);
  }
}

function createList(array) {
  const head = new Node(array[0]);

  array.slice(1).forEach((number) => {
    head.appendToTail(number);
  });

  return head;
}

test('[1, 2] -> <1> - <2>', () => {
  const node = createList([1, 2]);
  expect(node.value).toBe(1);
  expect(node.next.value).toBe(2);
});

test('[1, 2, 3, 4, 5] -> <1> - <2> - <3> - <4> - <5>', () => {
  const node = createList([1, 2, 3, 4, 5]);
  // 연결 리스트를 순회할 수 있는 이터레이터 같은 거 있었으면 좋겠다
  expect(node.value).toBe(1);
  expect(node.next.value).toBe(2);
  expect(node.next.next.value).toBe(3);
  expect(node.next.next.next.value).toBe(4);
  expect(node.next.next.next.next.value).toBe(5);
});
