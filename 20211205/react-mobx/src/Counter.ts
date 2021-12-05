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
