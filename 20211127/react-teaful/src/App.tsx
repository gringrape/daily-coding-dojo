import { useStore } from './store';

export default function App() {
  const [counter, setCounter] = useStore.counter();

  const handleClick = () => {
    setCounter(counter.increment());
  };

  return (
    <>
      <h1>Counter</h1>
      <p>{counter.count}</p>
      <button type="button" onClick={handleClick}>
        plus
      </button>
    </>
  );
}
