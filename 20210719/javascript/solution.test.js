function search(page, word) {
  const wordRegex = new RegExp(
    `${word}`,
    'gi',
  );

  let count = 0;
  while (wordRegex.exec(page) !== null) {
    const { lastIndex } = wordRegex;

    const before = page[lastIndex - word.length - 1];
    const after = page[lastIndex];

    const beforeOkay = !before || before.search(/[^a-z]/i) >= 0;
    const afterOkay = !after || after.search(/[^a-z]/i) >= 0;

    if (beforeOkay && afterOkay) {
      count += 1;
    }
  }

  return count;
}

function countLinks(page) {
  const matched = page
    .match(/<a href=\\"https:\/\/(\S*)\\"/g);

  return matched ? matched.length : 0;
}

function linked(thisPage, pages) {
  const matchURL = thisPage.match(/<meta content="(.*)"/);

  if (!matchURL) {
    return [];
  }

  const url = matchURL[1];
  const link = `href="${url}"`;

  return pages
    .map((page, i) => [page, i])
    .filter(([page]) => page.search(new RegExp(link)) >= 0)
    .map(([, i]) => i);
}

function solution(word, pages) {
  const mapped = pages.map((page, i) => ({
    index: i,
    html: page,
    basic: search(page, word),
    externalLinks: countLinks(page),
  }));

  const mapped2 = mapped.map((page) => ({
    ...page,
    link: linked(page.html, pages).map((i) => {
      const { basic, externalLinks } = mapped[i];
      return basic / externalLinks;
    }).reduce((a, c) => a + c, 0),
  }));

  const mapped3 = mapped2.map((page) => ({
    ...page,
    match: page.basic + page.link,
  }));

  return mapped3
    .sort((a, b) => a.index - b.index)
    .sort((a, b) => b.match - a.match)
    .map(({ index }) => index)[0];
}

describe('solution', () => {
  const html1 = `
    <html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8">
      <meta property="og:url" content="https://a.com"/>
    </head>  
    <body>
    Blind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. 
    <a href="https://b.com"> Link to b </a>
    </body>
    </html>
  `;

  const html2 = `
    <html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8">
      <meta property="og:url" content="https://b.com"/>
    </head>  
    <body>
    Suspendisse potenti. Vivamus venenatis tellus non turpis bibendum, 
    <a href="https://a.com"> Link to a </a>
    blind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.
    <a href="https://c.com"> Link to c </a>
    </body>
    </html>
  `;

  const html3 = `
    <html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8">
      <meta property="og:url" content="https://c.com"/>
    </head>  
    <body>
    Ut condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind
    <a href="https://a.com"> Link to a </a>
    </body>
    </html>
  `;

  test('search', () => {
    // expect(search('abab abababa', 'aba')).toBe(0);
    expect(search('aba@aba aba', 'aba')).toBe(3);

    expect(search(html1, 'blind')).toBe(3);
    expect(search(html2, 'blind')).toBe(1);
    expect(search(html3, 'blind')).toBe(1);
  });

  test('linked', () => {
    expect(linked(html1, [html1, html2, html3]).length).toBe(2);
  });

  test('countLinks', () => {
    expect(countLinks(html1)).toBe(1);
    expect(countLinks(html2)).toBe(2);
    expect(countLinks(html3)).toBe(1);
  });

  test('sample', () => {
    expect(solution(
      'blind',
      [html1, html2, html3],
    )).toBe(0);

    expect(solution(
      'Muzi',
      ['<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>', '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>'],
    )).toBe(1);
  });
});
