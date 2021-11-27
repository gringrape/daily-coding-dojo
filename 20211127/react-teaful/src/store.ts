import createStore from 'teaful';
import Counter from './Counter';

const initialState = {
  counter: new Counter(0),
};

export const { useStore } = createStore(initialState, undefined);

// TODO: delete this
export default {};
