import { observer } from 'mobx-react';

import { useState } from 'react';

import Counter from './Counter';

const App = observer(() => {
  const [counter] = useState(new Counter());

  const handleClick = () => {
    counter.increment();
  };

  return (
    <>
      <h1>Simple Counter</h1>
      <p>{counter.count}</p>
      <button type="button" onClick={handleClick}>
        increase
      </button>
    </>
  );
});

export default App;
