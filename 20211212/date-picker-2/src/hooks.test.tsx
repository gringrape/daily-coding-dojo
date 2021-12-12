import { renderHook, act } from '@testing-library/react-hooks';

import { RecoilRoot } from 'recoil';

import { useDates } from './hooks';

describe('usePosts', () => {
  const wrapper = ({ children }: { children: any}) => (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );

  const render = () => renderHook(() => useDates(), { wrapper });

  it('moves to next month', () => {
    const { result } = render();

    act(() => {
      result.current.nextMonth();
    });

    expect(result.current.state.month).toBe(1);
  });

  it('moves to prev month', () => {
    const { result } = render();

    act(() => {
      result.current.prevMonth();
    });

    expect(result.current.state.month).toBe(11);
  });
});
