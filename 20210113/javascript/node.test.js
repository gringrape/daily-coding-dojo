class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

describe('Node', () => {
  test('value', () => {
    expect(new Node(3).value).toBe(3);
  });

  describe('next', () => {
    it('next null initially', () => {
      const current = new Node(3);

      expect(current.next).toBeNull();
    });

    it('returns given next', () => {
      const current = new Node(3);

      current.next = new Node(5);

      expect(current.next.value).toBe(5);
    });
  });
});

module.exports = Node;
