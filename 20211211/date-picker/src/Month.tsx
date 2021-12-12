import dayjs from 'dayjs';

export default function Month({ month, year, onClickDay }: {
  month: string;
  year: string;
  onClickDay: (day: number) => void;
}) {
  const thisMonth = dayjs(`${year}-${month}`);

  const startWeekday = thisMonth.startOf('month').day();

  const cells = [...Array(Math.ceil((startWeekday + thisMonth.daysInMonth()) / 7) * 7)]
    .map((_, i) => (
      {
        id: `${thisMonth.month()}-${i + 1}`,
        day: i + 1 - startWeekday,
        week: Math.floor(i / 7 + 1),
      }
    ));

  const rows = (function go(targets): any {
    if (targets.length === 0) {
      return [];
    }

    return [targets.slice(0, 7)].concat(go(targets.slice(7)));
  }(cells));

  return (
    <>
      <p>{`${thisMonth.year()} 년 ${thisMonth.month() + 1} 월`}</p>
      <ul>
        <div>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <span style={{ display: 'inline-block', width: '20px', height: '20px' }}>
              {day}
            </span>
          ))}
        </div>
        {rows.map((row: any) => (
          <div>
            {row.map((cell: any) => (
              <button
                type="button"
                style={{ display: 'inline-block', width: '20px', height: '20px' }}
                key={cell.id}
                onClick={() => onClickDay(cell.day)}
              >
                {cell.day > 0 && cell.day <= thisMonth.daysInMonth() ? cell.day : '-'}
              </button>
            ))}
          </div>
        ))}
      </ul>
    </>
  );
}
