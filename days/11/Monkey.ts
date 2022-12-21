import { Item } from "./Item";

export interface TestDescription {
  test: string;
  trueTarget: number;
  falseTarget: number;
}

export interface MonkeyDescription {
  number: number;
  startingItems: number[];
  operation: string;
  test: TestDescription;
};

type OperateFunction = (value: number) => number;
export const generateOperateItem = (operation: string): OperateFunction => {
  const trimmed = operation.replace('new = old ', '');
  const [operator, stringValue] = trimmed.split(' ');
  let operationValue: number | null = null;
  if (stringValue !== "old") {
    operationValue = Number(stringValue);
  }
  
  if (operator === '*') {
    return (value: number) => {
      return value * (operationValue || value);
    };
  }

  return (value: number) => {
    return value + (operationValue || value)
  };
};

type InspectFunction = (value: number) => boolean;
export const generateInspectItem = (inspect: string): InspectFunction => {
  const stringValue = inspect.replace('divisible by ', '');
  const divisibleBy = Number(stringValue);
  
  return (value: number) => {
    return value % divisibleBy === 0
  };
}

export interface ItemThrow {
  item: Item;
  monkey: number;
}

export class Monkey {
  private description: MonkeyDescription;
  private items: Item[] = [];
  private itemOperation: OperateFunction;
  private itemInspection: InspectFunction;
  public inspectCount = 0;

  public getItems() {
    return this.items.map(item => item.describe());
  }

  public constructor(
    description: MonkeyDescription,
    worryDrop?: number,
  ) {
    this.description = description;

    this.items = description.startingItems.map(i => new Item(i, worryDrop));
    this.itemOperation = generateOperateItem(this.description.operation);
    this.itemInspection = generateInspectItem(this.description.test.test);
  }

  public inspectItems(): ItemThrow[] {
    const throws: ItemThrow[] = [];
    for (const item of this.items) {
      this.inspectCount ++;
      item.handle(this.itemOperation);
      const testResult = item.test(this.itemInspection);

      if (testResult) {
        throws.push({
          item, monkey: this.description.test.trueTarget
        });
      } else {
        throws.push({
          item, monkey: this.description.test.falseTarget
        });
      }
    }
    this.items = [];
    return throws;
  }

  public throwAtMe(item: Item) {
    this.items.push(item);
  }

  public describe() {
    let output = `[Monkey] with\n`;
    for (const item of this.items) {
      output += `- ${item.describe()}\n`;
    }
    return output;
  }
}
