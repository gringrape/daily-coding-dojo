/* eslint-disable no-loop-func */
class Node {
  constructor(value, name, parent) {
    this.value = value;
    this.parent = parent;
    this.name = name;
  }
}

function parse(enroll, seller, amount) {
  const sells = seller.reduce((a, c, i) => ({
    ...a,
    [c]: (a[c] || 0) + amount[i] * 100,
  }), {});

  return enroll.reduce((a, c, i) => ({
    ...a,
    [i]: new Node((sells[c] || 0), c),
  }), {});
}

test('parse', () => {
  expect(parse(
    ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
    ['young', 'john', 'tod', 'emily', 'mary'],
    [12, 4, 2, 5, 10],
  )[7].value).toBe(1200);
});

function construct(enroll, referral, seller, amount, nodes) {
  const tree = {};
  const center = new Node(0, '-');
  const nameToId = enroll.reduce((a, c, i) => ({
    ...a,
    [c]: i,
  }), {});
  nameToId['-'] = -1;
  nodes['-1'] = center;

  const referralWithId = referral
    .map((name, i) => ({ id: i, name }));

  const findChildren = (depth, name) => referralWithId
    .filter(({ name: referralName }) => (
      referralName === (depth === 0 ? '-' : name)
    ))
    .map(({ id }) => {
      const node = nodes[id];
      node.parent = nodes[nameToId[name]];
      return node;
    });

  tree[1] = findChildren(0, '-');

  let depth = 1;
  while (tree[depth]) {
    tree[depth].forEach(({ name }) => {
      const children = findChildren(depth, name);

      if (children.length > 0) {
        tree[depth + 1] = [
          ...(tree[depth + 1] || []),
          ...children,
        ];
      }
    });

    depth += 1;
  }

  return tree;
}

test('tree', () => {
  const enroll = ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'];
  const referral = ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'];
  const seller = ['young', 'john', 'tod', 'emily', 'mary'];
  const amount = [12, 4, 2, 5, 10];

  const nodes = parse(enroll, seller, amount);
  expect(construct(
    enroll, referral, seller, amount, nodes,
  )[1].length).toBe(2);
});

function solution(enroll, referral, seller, amount) {
  const nodes = parse(enroll, seller, amount);
  const tree = construct(enroll, referral, seller, amount, nodes);

  Object.entries(tree)
    .sort(([a], [b]) => b - a)
    .map(([, nodelist]) => nodelist)
    .forEach((nodelist) => {
      nodelist.forEach((node) => {
        const { parent, value } = node;
        if (!parent) {
          return;
        }

        const mine = Math.round(value * 0.9);
        node.value = mine;
        parent.value += value - mine;
      });
    });

  return Object.entries(nodes)
    .sort(([a], [b]) => a - b)
    .slice(1)
    .map(([, node]) => node.value);
}

test('sample', () => {
  expect(solution(
    ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
    ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
    ['young', 'john', 'tod', 'emily', 'mary'],
    [12, 4, 2, 5, 10],
  )).toEqual([360, 958, 108, 0, 450, 18, 180, 1080]);
});
