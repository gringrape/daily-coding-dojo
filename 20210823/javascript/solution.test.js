function parse(file) {
  return file.match(/(?<head>[^\d]+)(?<number>\d{1,5})(?<tail>.*)/).groups;
}

test('parse', () => {
  expect(parse('foo9.txt')).toEqual({
    head: 'foo',
    number: '9',
    tail: '.txt',
  });

  expect(parse('foo010bar020.zip')).toEqual({
    head: 'foo',
    number: '010',
    tail: 'bar020.zip',
  });

  expect(parse('F-15')).toEqual({
    head: 'F-',
    number: '15',
    tail: '',
  });
});

function solution(files) {
  return files.map((file, index) => ({
    index,
    file,
    ...parse(file),
  }))
    .sort(({ index: i1 }, { index: i2 }) => i1 - i2)
    .sort(({ number: n1 }, { number: n2 }) => parseInt(n1, 10) - parseInt(n2, 10))
    .sort(({ head: h1 }, { head: h2 }) => (h1.toUpperCase() < h2.toUpperCase() ? -1 : 1))
    .map(({ file }) => file);
}

test('solution', () => {
  expect(solution(
    ['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG'],
  )).toEqual(
    ['img1.png', 'IMG01.GIF', 'img02.png', 'img2.JPG', 'img10.png', 'img12.png'],
  );

  expect(solution(
    ['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat'],
  )).toEqual(
    ['A-10 Thunderbolt II', 'B-50 Superfortress', 'F-5 Freedom Fighter', 'F-14 Tomcat'],
  );
});
