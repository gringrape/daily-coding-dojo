export default class Counter {
  private value: number;

  constructor(count: number) {
    this.value = count;
  }

  get count() {
    return this.value;
  }

  increment() {
    return new Counter(this.value + 1);
  }
}
