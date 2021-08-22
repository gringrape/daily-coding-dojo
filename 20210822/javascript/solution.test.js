// 유저 정보
// 비밀번호
// 상태: 로그인 여부, 장바구니

// 기능
// 1. 로그인
// 2. 장바구니 추가
// 3. 주문

function solution(infos, actions) {
  const users = Object.fromEntries(infos.map((info) => info.split(' ')));

  const state = {
    login: false,
    basket: [],
  };

  const login = ([id, password]) => {
    if (state.login) {
      return false;
    }

    if (users[id] === password) {
      state.login = true;
      return true;
    }

    return false;
  };

  const add = ([amount]) => {
    if (!state.login) {
      return false;
    }

    state.basket.push(amount);
    return true;
  };

  const order = () => {
    if (!state.basket.length) {
      return false;
    }

    state.basket = [];
    return true;
  };

  const act = (action) => {
    const [func, ...payload] = action.split(' ');

    return {
      LOGIN: login,
      ADD: add,
      ORDER: order,
    }[func](payload);
  };

  return actions.map(act);
}

test('password', () => {
  expect(solution(
    ['kim password', 'lee abc'],
    [
      'LOGIN kim abc',
    ],
  )).toEqual([false]);

  expect(solution(
    ['kim password', 'lee abc'],
    [
      'LOGIN kim abc',
      'LOGIN lee abc',
    ],
  )).toEqual([false, true]);
});

test('login state', () => {
  expect(solution(
    ['kim password', 'lee abc'],
    [
      'LOGIN kim abc',
      'LOGIN lee abc',
      'LOGIN kim password',
    ],
  )).toEqual([false, true, false]);
});

test('add', () => {
  expect(solution(
    ['kim password', 'lee abc'],
    [
      'LOGIN kim abc',
      'ADD 30',
    ],
  )).toEqual([false, false]);
});
