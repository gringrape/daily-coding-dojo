function smallestPrimeOf(num, curr = 2) {
	return num % curr === 0 ? curr : smallestPrimeOf(num, curr + 1);
}

test('smallestPrimeOf', () => {
	expect(smallestPrimeOf(2)).toBe(2);
	expect(smallestPrimeOf(3)).toBe(3);
	expect(smallestPrimeOf(4)).toBe(2, 2);
	expect(smallestPrimeOf(121)).toBe(11);
});

function primeFactors(num) {
	if (num < 2) {
		return [];
	}

	const smallestPrime = smallestPrimeOf(num);

	return num / smallestPrime === 1 ? [ smallestPrime ] : [ smallestPrime, ...primeFactors(num / smallestPrime) ];
}

test('primeFactors', () => {
	expect(primeFactors(1)).toEqual([]);
	expect(primeFactors(2)).toEqual([ 2 ]);
	expect(primeFactors(3)).toEqual([ 3 ]);
	expect(primeFactors(4)).toEqual([ 2, 2 ]);
	expect(primeFactors(6)).toEqual([ 2, 3 ]);
	expect(primeFactors(8)).toEqual([ 2, 2, 2 ]);
	expect(primeFactors(1000)).toEqual([ 2, 2, 2, 5, 5, 5 ]);
});

function factorize(num) {
	return primeFactors(num).reduce(
		(acc, curr) => ({
			...acc,
			[curr]: (acc[curr] || 0) + 1
		}),
		{ 1: 1 }
	);
}

test('factorize', () => {
	expect(factorize(1)).toEqual({ 1: 1 });
	expect(factorize(2)).toEqual({ 1: 1, 2: 1 });
	expect(factorize(3)).toEqual({ 1: 1, 3: 1 });
	expect(factorize(4)).toEqual({ 1: 1, 2: 2 });
	expect(factorize(6)).toEqual({ 1: 1, 2: 1, 3: 1 });
	expect(factorize(8)).toEqual({ 1: 1, 2: 3 });
	expect(factorize(1000)).toEqual({ 1: 1, 2: 3, 5: 3 });
});

function findMaxCommonPrime(n, m) {
  const factorsN = factorize(n);
  const factorsM = factorize(m);

  return Object.keys(factorsN)
    .filter((key) => factorsM[key] >= 1)
    .map((commonKey) => ({ key: commonKey, value: Math.min(factorsM[commonKey], factorsN[commonKey])}))
    .reduce((acc, curr) => acc * (curr.key ** curr.value), 1);
}

test('findMaxCommonPrime', () => {
  expect(findMaxCommonPrime(3, 12)).toBe(3);
  expect(findMaxCommonPrime(32, 64)).toBe(32);
});

function findMinCommonProduct(n, m) {
  const factorsN = factorize(n);
  const factorsM = factorize(m);

  return Object.keys({ ...factorsM, ...factorsN })
    .map((key) => ({ key, value: Math.max(factorsM[key] || 0, factorsN[key] || 0) }))
    .reduce((acc, curr) => acc * (curr.key ** curr.value), 1);
}

test('findMinCommonProduct', () => {
  expect(findMinCommonProduct(3, 12)).toBe(12);
  expect(findMinCommonProduct(32, 64)).toBe(64);
});

// 일반적인 반복

function findLCM(n, m, count = Math.max(n, m)) {
  if (count % n === 0 && count % m === 0) {
    return count;
  }
  
  return findLCM(n, m, count + 1);
}

test('findLCM', () => {
  expect(findLCM(3, 12)).toBe(12);
	expect(findLCM(32, 64)).toBe(64);
	expect(findLCM(48, 60)).toBe(240);
	expect(findLCM(1, 5)).toBe(5);
});

function findGCF(n, m, count = 2, cfs = [1]) {
  if (count > Math.min(n, m)) {
    return Math.max(...cfs);
  }
  return (n % count === 0 && m % count === 0) 
    ? findGCF(n, m, count + 1, [...cfs, count])
    : findGCF(n, m, count + 1, cfs);
}

test('findGCF', () => {
	expect(findGCF(2, 5)).toBe(1);
	expect(findGCF(32, 64)).toBe(32);
	expect(findGCF(48, 60)).toBe(12);
	expect(findGCF(1000000, 10)).toBe(10);
});

function solution(n, m) {
	const GCF = findGCF(n, m);

  return [GCF, n * m / GCF];
}
