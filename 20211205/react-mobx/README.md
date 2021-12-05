# React + mobx

의존성 설치, 초기화 -> hello world

```bash
npm install
npm start
```

mobx 설치

```bash
npm install --save mobx
```

`tsconfig.json`:

```json
{
    // ...
    "useDefineForClassFields": true    
    // ...
}
```

상태관리 로직

```javascript
import {
  makeObservable, computed, observable, action,
} from 'mobx';

class Counter {
  value: number = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      count: computed,
      increment: action,
    });
  }

  get count() {
    return this.value;
  }

  increment() {
    this.value += 1;
  }
}

export default Counter;

```

컴포넌트

```javascript
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

```