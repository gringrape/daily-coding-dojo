import dayjs from 'dayjs';

export function getWeeks(year: number, month: number) {
  const thisMonth = dayjs(`${year}-${month}`);

  const firstDay = thisMonth.startOf('month').startOf('week');
  const lastDay = thisMonth.endOf('month').endOf('week');

  const days = [...Array(lastDay.diff(firstDay, 'day') + 1).keys()]
    .map((i) => firstDay.add(i, 'day').toDate());

  return [...Array(days.length / 7).keys()].map((i) => days.slice(i * 7, i * 7 + 7));
}

export function isInMonth(day: Date, year: number, month: number) {
  const firstDay = dayjs(`${year}-${month}`).startOf('month').toDate();
  const lastDay = dayjs(`${year}-${month}`).endOf('month').toDate();

  return day >= firstDay && day <= lastDay;
}
