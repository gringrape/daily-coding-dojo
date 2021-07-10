function check(room) {
  const inBoundary = (i, j) => i >= 0 && i < 5 && j >= 0 && j < 5;

  const nextSeatCheck = (i, j) => [[i + 1, j], [i, j + 1], [i - 1, j], [i, j - 1]]
    .every((([r, c]) => !inBoundary(r, c) || room[r][c] !== 'P'));

  const diagonalSeatCheck = (i, j) => {
    if (inBoundary(i + 1, j + 1) && room[i + 1][j + 1] === 'P') {
      if (room[i + 1][j] !== 'X' || room[i][j + 1] !== 'X') {
        return false;
      }
    }
    if (inBoundary(i - 1, j - 1) && room[i - 1][j - 1] === 'P') {
      if (room[i - 1][j] !== 'X' || room[i][j - 1] !== 'X') {
        return false;
      }
    }
    if (inBoundary(i + 1, j - 1) && room[i + 1][j - 1] === 'P') {
      if (room[i][j - 1] !== 'X' || room[i + 1][j] !== 'X') {
        return false;
      }
    }
    if (inBoundary(i - 1, j + 1) && room[i - 1][j + 1] === 'P') {
      if (room[i - 1][j] !== 'X' || room[i][j + 1] !== 'X') {
        return false;
      }
    }

    return true;
  };

  const awaySeatCheck = (i, j) => [[i + 2, j], [i, j + 2], [i - 2, j], [i, j - 2]]
    .every(([r, c]) => {
      if (!inBoundary(r, c)) {
        return true;
      }

      if (room[r][c] !== 'P') {
        return true;
      }

      return room[Math.floor((r + i) / 2)][Math.floor((c + j) / 2)] === 'X';
    });

  const seatSafe = (seat, i, j) => {
    if (seat !== 'P') {
      return true;
    }

    return nextSeatCheck(i, j) && diagonalSeatCheck(i, j) && awaySeatCheck(i, j);
  };

  const rowSafe = (row, i) => [...row].every((seat, j) => seatSafe(seat, i, j));
  const roomSafe = room.every((row, i) => rowSafe(row, i));

  return roomSafe ? 1 : 0;
}

test('one room', () => {
  expect(check(['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP']))
    .toBe(1);
});

function solution(rooms) {
  return rooms.map(check);
}

test('samples', () => {
  expect(solution([['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'], ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'], ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'], ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'], ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP']]))
    .toEqual([1, 0, 1, 1, 1]);
});
