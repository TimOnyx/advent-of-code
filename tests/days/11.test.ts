import { readFileSync } from "fs";
import { generateMonkeyDescription, getModulo, runRounds } from "../../days/11";
import { generateInspectItem, generateOperateItem, Monkey, MonkeyDescription } from "../../days/11/Monkey";
import { Item } from "../../days/11/Item";
import { generateEntries, splitLines } from "../../days/util/fileProcessing";

const monkeySample = 
`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`;

describe('[Day 10]', () => {
  test('GenerateMonkeyDescription', () => {
    expect(generateMonkeyDescription(monkeySample)).toEqual({
      number: 0,
      startingItems: [79, 98],
      operation: 'new = old * 19',
      test: {
        test: 'divisible by 23',
        trueTarget: 2,
        falseTarget: 3
      }
    });
  });

  describe('GenerateOperateItem', () => {
    test('multiple operation', () => {
      const operation = generateOperateItem('new = old * 2');
      expect(operation(3)).toEqual(6);
    });
    test('add operation', () => {
      const operation = generateOperateItem('new = old + 2');
      expect(operation(3)).toEqual(5);
    })
  });

  describe('GenerateInspectItem', () => {
    test('divisible by 10', () => {
      const inspect = generateInspectItem('divisible by 10');
      expect(inspect(10)).toBeTruthy();
      expect(inspect(20)).toBeTruthy();
      expect(inspect(30)).toBeTruthy();
    });
    test('divisible by 15', () => {
      const inspect = generateInspectItem('divisible by 15');
      expect(inspect(10)).toBeFalsy();
      expect(inspect(20)).toBeFalsy();
      expect(inspect(30)).toBeTruthy();
    });
  });

  describe('RunRounds a1', () => {
    const content = readFileSync('days/11/example.txt').toString();
    const monkeyInputs = content.split('\n\n');
    const monkeyDescriptions: MonkeyDescription[] = generateEntries(monkeyInputs, generateMonkeyDescription);
    const monkeys = monkeyDescriptions.map(desc => new Monkey(desc));
    
    test('after 1 round', () => {
      runRounds(monkeys, 1);
      expect(monkeys[0].getItems()).toEqual([
        new Item(20).describe(),
        new Item(23).describe(),
        new Item(27).describe(),
        new Item(26).describe(),
      ]);

      expect(monkeys[1].getItems()).toEqual([
        new Item(2080).describe(),
        new Item(25).describe(),
        new Item(167).describe(),
        new Item(207).describe(),
        new Item(401).describe(),
        new Item(1046).describe(),
      ]);

      expect(monkeys[2].getItems()).toEqual([]);
      expect(monkeys[3].getItems()).toEqual([]);
    });
  });

  const content = readFileSync('days/11/example.txt').toString();
  const monkeyInputs = content.split('\n\n');
  const monkeyDescriptions: MonkeyDescription[] = generateEntries(monkeyInputs, generateMonkeyDescription);
  const modulo = getModulo(monkeyDescriptions);
  describe('GetModulo', () => {
    test('Modulo is each test value multiplied', () => {
      expect(modulo).toBe(23 * 19 * 13 * 17);
    })
  });

  describe('RunRounds a2', () => {
    
    test('after 1 round', () => {
      const monkeys = monkeyDescriptions.map(desc => new Monkey(desc, modulo));
      runRounds(monkeys, 1);
      expect(monkeys[0].inspectCount).toBe(2);
      expect(monkeys[1].inspectCount).toBe(4);
      expect(monkeys[2].inspectCount).toBe(3);
      expect(monkeys[3].inspectCount).toBe(6);
    });

    test('after 20 round', () => {
      const monkeys = monkeyDescriptions.map(desc => new Monkey(desc, modulo));
      runRounds(monkeys, 20);
      expect(monkeys[0].inspectCount).toBe(99); // -3
      expect(monkeys[1].inspectCount).toBe(97); // +3
      expect(monkeys[2].inspectCount).toBe(8); // -5
      expect(monkeys[3].inspectCount).toBe(103); // -3
    });
  });

  describe('Item', () => {
    const item = new Item(100);
    test('Items can be created', () => {
      expect(item.describe()).toBe('[Item] 100');
    })
    test('Items can be handled', () => {
      const item = new Item(100);
      item.handle(value => value * 6);
      // item value goes to 600. Then drops /3 to 200
      expect(item.describe()).toBe('[Item] 200');
    })
    test('Items can be tested', () => {
      expect(item.test(value => value === 1)).toBeFalsy();
      expect(item.test(value => value === 100)).toBeTruthy();
    })
    test('Items have an alternative worrydrop using modulo', () => {
      // Note: this does not check the function,
      // but validates the math.
      const mod5Check = (value: number) => value % 5 === 0;
      const mod3Check = (value: number) => value % 3 === 0;
      const mod2Check = (value: number) => value % 2 === 0;
      const supermod = 5 * 3 * 2;

      const itemA1 = new Item(69);
      const itemA2 = new Item(69%supermod);
      const itemB1 = new Item(420);
      const itemB2 = new Item(420%supermod);

      expect(itemA1.test(mod5Check)).toBe(itemA2.test(mod5Check));
      expect(itemB1.test(mod5Check)).toBe(itemB2.test(mod5Check));

      expect(itemA1.test(mod3Check)).toBe(itemA2.test(mod3Check));
      expect(itemB1.test(mod3Check)).toBe(itemB2.test(mod3Check));

      expect(itemA1.test(mod2Check)).toBe(itemA2.test(mod2Check));
      expect(itemB1.test(mod2Check)).toBe(itemB2.test(mod2Check));
    })

    test('Item can be handled with worryDrop', () => {
      const item = new Item(50, 3);
      item.handle(num => num); // noop
      expect(item.describe()).toContain(String(50%3))
    });
  });

  describe('Monkey', () => {
    const monkey = new Monkey({
      number: 0,
      startingItems: [1],
      operation: 'new = old * 6',
      test: {
        test: 'divisible by 23',
        trueTarget: 2,
        falseTarget: 3
      }
    });
    test('Monkey can be created', () => {
      const description = monkey.describe();
      expect(description).toContain("[Monkey] with");
      expect(description).toContain("- [Item] 1");
    });

    test('Monkey can handle items', () => {
      const monkey = new Monkey({
        number: 0,
        startingItems: [1],
        operation: 'new = old * 6',
        test: {
          test: 'divisible by 23',
          trueTarget: 2,
          falseTarget: 3
        }
      });
      expect(monkey.inspectCount).toBe(0);
      monkey.inspectItems();
      const description = monkey.describe();
      expect(description).toBe("[Monkey] with\n");
      expect(monkey.inspectCount).toBe(1);
    });

    test('Monkey can receive items', () => {
      const monkey = new Monkey({
        number: 0,
        startingItems: [1],
        operation: 'new = old * 6',
        test: {
          test: 'divisible by 23',
          trueTarget: 2,
          falseTarget: 3
        }
      });
      monkey.throwAtMe(new Item(5));
      const description = monkey.describe();
      expect(description).toContain("[Monkey] with");
      expect(description).toContain("- [Item] 1");
      expect(description).toContain("- [Item] 5");
    })
  });
})