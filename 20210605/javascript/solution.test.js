class CitiesCache {
  constructor(size) {
    this.time = 0;
    this.cities = [];
    this.size = size;
  }

  read(city) {
    const lowerCasedName = city.toLowerCase();
    const isExistedCity = this.isExisted(lowerCasedName);

    this.update(lowerCasedName);

    return isExistedCity ? 1 : 5;
  }

  isExisted(city) {
    return this.cities
      .some(([name]) => city === name);
  }

  update(city) {
    if (!this.size) {
      return;
    }

    if (this.cities.length < this.size) {
      this.cities.push([
        city, this.time,
      ]);
      this.time += 1;
      return;
    }

    if (!this.isExisted(city)) {
      this.cities.sort(([, age1], [, age2]) => age1 - age2);
      this.cities[0] = [city, this.time];
      this.time += 1;
      return;
    }

    const found = this.cities.find(([name]) => name === city);
    found[1] = this.time;
    this.time += 1;
  }
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

describe('CitiesCache', () => {
  test('creation', () => {
    expect(new CitiesCache());
  });

  describe('read', () => {
    context('with new city', () => {
      it('returns "5" as not found time', () => {
        const cache = new CitiesCache(5);

        expect(cache.read('New York')).toBe(5);
      });
    });

    context('with existed city', () => {
      it('returns "1" as found time', () => {
        const cache = new CitiesCache(5);

        cache.read('Seoul');

        expect(cache.read('Seoul')).toBe(1);
      });
    });

    context('with cache size "2"', () => {
      it('reads according to updated cache', () => {
        const cache = new CitiesCache(2);

        cache.read('Seoul');
        cache.read('Busan');
        cache.read('Dajeon');

        expect(cache.read('Seoul')).toBe(5);
      });
    });
  });
});

function solution(cacheSize, cities) {
  const cache = new CitiesCache(cacheSize);

  return cities.reduce((a, n) => a + cache.read(n), 0);
}

test('solution', () => {
  expect(solution(3, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']))
    .toBe(50);

  expect(solution(3, ['Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul']))
    .toBe(21);

  expect(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork']))
    .toBe(16);

  expect(solution(0, ['Jeju', 'Pangyo', 'NewYork', 'newyork']))
    .toBe(20);
});
