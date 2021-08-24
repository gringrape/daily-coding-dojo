function solution(table, languages, preferences) {
  const languagePreferences = Object.fromEntries(
    languages.map((language, i) => [language, preferences[i]]),
  );

  const calculateScore = (fieldLanguages) => (
    fieldLanguages.reduce((a, l, i) => a + (5 - i) * (languagePreferences[l] || 0), 0)
  );

  return table
    .map((str) => str.split(' '))
    .map(([field, ...fieldLanguages]) => [field, calculateScore(fieldLanguages)])
    .sort(([fieldName1], [fieldName2]) => (fieldName1 < fieldName2 ? -1 : 1))
    .sort(([, score1], [, score2]) => score2 - score1)
    .map(([field]) => field)[0];
}

test('test sample', () => {
  expect(solution(
    ['SI JAVA JAVASCRIPT SQL PYTHON C#', 'CONTENTS JAVASCRIPT JAVA PYTHON SQL C++', 'HARDWARE C C++ PYTHON JAVA JAVASCRIPT', 'PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP', 'GAME C++ C# JAVASCRIPT C JAVA'],
    ['PYTHON', 'C++', 'SQL'],
    [7, 5, 5],
  )).toEqual('HARDWARE');
});
