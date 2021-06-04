class FileName {
  constructor(name) {
    const [head, number, ...remains] = name.split(/([^\d]+)/).filter((i) => i);
    const tail = remains.join('');

    this.head = head;
    this.number = number;
    this.tail = tail;
  }

  toString() {
    return this.head.concat(this.number).concat(this.tail);
  }
}

describe('FileName', () => {
  test('creation', () => {
    expect(new FileName(''));
  });

  it('parses name to parts', () => {
    const fileName = new FileName('img12.png');

    expect(fileName.head).toBe('img');
    expect(fileName.number).toBe('12');
    expect(fileName.tail).toBe('.png');
  });

  context('with complex file name', () => {
    it('parses name to parts', () => {
      const fileName = new FileName('foo010bar020.zip');

      expect(fileName.head).toBe('foo');
      expect(fileName.number).toBe('010');
      expect(fileName.tail).toBe('bar020.zip');
    });
  });
});

function solution(files) {
  const lowerCaseHeadOf = (f) => f.head.toLowerCase();
  const parsedNumberOf = (f) => parseInt(f.number, 10);

  return files
    .map((f) => new FileName(f))
    .sort((f1, f2) => parsedNumberOf(f1) - parsedNumberOf(f2))
    .sort((f1, f2) => lowerCaseHeadOf(f1).localeCompare(lowerCaseHeadOf(f2)))
    .map((f) => f.toString());
}

describe('solution', () => {
  it('sorts by head', () => {
    expect(solution(['bbb1.jpg', 'aaa2.jpg'])).toEqual([
      'aaa2.jpg', 'bbb1.jpg',
    ]);
  });
  it('sorts by head', () => {
    expect(solution(['BBB1.jpg', 'aaa2.jpg'])).toEqual([
      'aaa2.jpg', 'BBB1.jpg',
    ]);
  });
  it('sorts by number', () => {
    expect(solution(['aaa0011.jpg', 'aaa012.jpg'])).toEqual([
      'aaa0011.jpg', 'aaa012.jpg',
    ]);
  });

  it('sorts', () => {
    expect(solution(['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG'])).toEqual(
      ['img1.png', 'IMG01.GIF', 'img02.png', 'img2.JPG', 'img10.png', 'img12.png'],
    );
  });
  it('sorts', () => {
    expect(solution(['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat'])).toEqual(
      ['A-10 Thunderbolt II', 'B-50 Superfortress', 'F-5 Freedom Fighter', 'F-14 Tomcat'],
    );
  });
});
