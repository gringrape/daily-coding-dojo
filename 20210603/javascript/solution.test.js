class Dictionary {
  constructor() {
    this.data = {
      1: 'A',
      2: 'B',
      3: 'C',
      4: 'D',
      5: 'E',
      6: 'F',
      7: 'G',
      8: 'H',
      9: 'I',
      10: 'J',
      11: 'K',
      12: 'L',
      13: 'M',
      14: 'N',
      15: 'O',
      16: 'P',
      17: 'Q',
      18: 'R',
      19: 'S',
      20: 'T',
      21: 'U',
      22: 'V',
      23: 'W',
      24: 'X',
      25: 'Y',
      26: 'Z',
    };
  }

  find(word) {
    const indexString = Object.entries(this.data)
      .find(([, v]) => v === word)[0];

    return parseInt(indexString, 10);
  }

  register(word) {
    const newIndex = Object.keys(this.data).length + 1;

    this.data[newIndex] = word;
  }

  search(word) {
    const [foundIndex, foundWord] = Object.entries(this.data)
      .filter(([, v]) => word.startsWith(v))
      .sort(([, v1], [, v2]) => v2.length - v1.length)[0];

    return [parseInt(foundIndex, 10), foundWord];
  }
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

describe('Dictinary', () => {
  test('creation', () => {
    expect(new Dictionary());
  });

  describe('find', () => {
    it('returns index of the word', () => {
      const dictionary = new Dictionary();
      expect(dictionary.find('W')).toBe(23);
    });
  });

  describe('register', () => {
    it('registers a word', () => {
      const dictionary = new Dictionary();

      dictionary.register('KA');

      expect(dictionary.find('KA')).toBe(27);
    });
  });

  describe('search', () => {
    it('searches the longest match of the word', () => {
      const dictionary = new Dictionary();

      dictionary.register('KA');

      expect(dictionary.search('KAKAO')).toEqual([27, 'KA']);
    });

    it('searches the longest match of the word', () => {
      const dictionary = new Dictionary();

      expect(dictionary.search('KAKAO')).toEqual([11, 'K']);
    });
  });
});

function solution(word, dictionary = new Dictionary(), result = []) {
  const [foundIndex, foundWord] = dictionary.search(word);
  result.push(foundIndex);

  const remains = word.slice(foundWord.length);
  if (!remains) {
    return result;
  }
  dictionary.register(foundWord + remains[0]);
  return solution(remains, dictionary, result);
}

test('solution', () => {
  expect(solution('KAKAO')).toEqual([11, 1, 27, 15]);
});
