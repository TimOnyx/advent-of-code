export class Item {
  private value: number;
  private worryDrop?: number;

  public constructor(value: number, worryDrop?: number) {
    this.value = value;
    this.worryDrop = worryDrop;
  }

  public handle(func: (value: number) => number) {
    const valueAfterOperation = func(this.value);
    if (this.worryDrop) {
      this.value = valueAfterOperation % this.worryDrop;
      return;
    }
    const valueAfterWorryDrop = valueAfterOperation / 3;
    this.value = Math.floor(valueAfterWorryDrop);
  }

  public test(func: (value: number) => boolean) {
    return func(this.value);
  }

  public describe() {
    return `[Item] ${this.value}`;
  }
}
