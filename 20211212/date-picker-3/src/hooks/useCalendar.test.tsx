import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { RecoilRoot } from 'recoil';

import { act } from 'react-dom/test-utils';
import useCalendarState from './useCalendar';

import { calendarState } from '../state';
import CustomDate from '../customs/CustomDate';

describe('useCalendarState', () => {
  const initializeState = ({ set }: any) => {
    set(calendarState, {
      year: 2019,
      month: 12,
    });
  };

  const wrapper = ({ children }: {children: React.ReactNode}) => (
    <RecoilRoot initializeState={initializeState}>
      {children}
    </RecoilRoot>
  );

  const render = () => renderHook(() => useCalendarState(), { wrapper });

  it('uses calendar state', () => {
    const { result } = render();

    expect(result.current.state).toEqual({
      ...result.current.state,
      year: 2019,
      month: 12,
    });
  });

  it('moves to next month', () => {
    const { result } = render();

    act(() => {
      result.current.moveToNextMonth();
    });

    expect(result.current.state).toEqual({
      ...result.current.state,
      year: 2020,
      month: 1,
    });
  });

  it('moves to previous month', () => {
    const { result } = render();

    act(() => {
      result.current.moveToPreviousMonth();
    });

    expect(result.current.state).toEqual({
      ...result.current.state,
      year: 2019,
      month: 11,
    });
  });

  it('opens calendar', () => {
    const { result } = render();

    act(() => {
      result.current.openCalendar();
    });

    expect(result.current.state).toEqual({
      ...result.current.state,
      isCalendarOpen: true,
    });
  });

  it('closes calendar', () => {
    const { result } = render();

    act(() => {
      result.current.closeCalendar();
    });

    expect(result.current.state).toEqual({
      ...result.current.state,
      isCalendarOpen: false,
    });
  });

  it('picks date', () => {
    const { result } = render();

    act(() => {
      result.current.pickDay(new Date('2019-12-01'));
    });

    expect(result.current.state).toEqual({
      ...result.current.state,
      date: new CustomDate('2019-12-01'),
    });
  });
});
