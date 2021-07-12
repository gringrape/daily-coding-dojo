test('test worksp', () => {
  expect(1 + 1).toBe(2);
});

function solution(tickets) {
  const routes = [];

  function fly(departure = 'ICN', usedTickets = [], route = ['ICN']) {
    if (usedTickets.length === tickets.length) {
      routes.push(route);
      return;
    }

    tickets.forEach((ticket, i) => {
      const [from, to] = ticket;

      if (!usedTickets.includes(i) && from === departure) {
        fly(to, [...usedTickets, i], [...route, to]);
      }
    });
  }

  fly();

  return routes
    .sort((a, b) => (JSON.stringify(a) < JSON.stringify(b) ? -1 : 1))[0];
}

test('simple', () => {
  expect(solution([
    ['ICN', 'JFK'],
    ['JFK', 'HND'],
  ])).toEqual(['ICN', 'JFK', 'HND']);

  expect(solution([['ICN', 'SFO'], ['ICN', 'ATL'], ['SFO', 'ATL'], ['ATL', 'ICN'], ['ATL', 'SFO']]))
    .toEqual(['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO']);
});
