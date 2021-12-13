import { useState } from 'react';

import { RecoilRoot } from 'recoil';

import DatePicker from './components/DatePicker';

export default function App() {
  const [date, setDate] = useState(new Date());

  return (
    <RecoilRoot>
      <DatePicker current={date} onConfirm={(d) => setDate(d)} />
    </RecoilRoot>
  );
}
