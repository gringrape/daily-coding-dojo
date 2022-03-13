import Parser from './Parser';

describe('parse', () => {
  context('with empty text', () => {
    const text = '';

    it('returns empty list', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual([]);
    });
  });

  context('with text containing no string', () => {
    const text = 'abc';

    it('returns empty list', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual([]);
    });
  });

  context('with text containing a string', () => {
    const text = 'eee "abc"';

    it('returns list with the string', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual(['abc']);
    });
  });

  context('with text containing a many strings', () => {
    const text = '기후변화에 대해서 "fun" 하고 "cool" 하고 "sexy" 하게 대처해야 한다';

    it('returns list with the strings', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual(['fun', 'cool', 'sexy']);
    });
  });

  context('with text containing back slash', () => {
    const text = '"기후변화에 대해서 \\"fun\\" 하고 \\"cool\\" 하고 \\"sexy\\" 하게 대처해야 한다"';

    it('returns list with strings', () => {
      const parser = new Parser();

      const strings = parser.parse(text);

      expect(strings).toEqual(['기후변화에 대해서 \\"fun\\" 하고 \\"cool\\" 하고 \\"sexy\\" 하게 대처해야 한다']);
    });
  });
});
