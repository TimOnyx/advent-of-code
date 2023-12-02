// read file
import { readFileSync } from 'fs';
import { generateEntries } from '../util/fileProcessing';
import { Monkey, MonkeyDescription } from './Monkey';

const file = 'days/11/input.txt';

export const generateMonkeyDescription = (line: string): MonkeyDescription => {
  const [
    numberString,
    itemsString,
    operationString,
    testString,
    trueString,
    falseString,
  ] = line.split('\n');

  return {
    number: Number(numberString.replace('Monkey ', '').replace(':', '')),
    startingItems: itemsString.replace('  Starting items: ', '').split(', ').map(a => Number(a)),
    operation: operationString.replace('  Operation: ', ''),
    test: {
      test: testString.replace('  Test: ', ''),
      trueTarget: Number(trueString.replace('    If true: throw to monkey ', '')),
      falseTarget: Number(falseString.replace('    If false: throw to monkey ', ''))
    } 
  }
};

export const runRounds = (monkeys: Monkey[], rounds: number) => {
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      const throws = monkey.inspectItems();
      for (const itemThrow of throws) {
        monkeys[itemThrow.monkey].throwAtMe(itemThrow.item);
      }
    }
  }
}

const calculateMonkeyBusiness = (monkeys: Monkey[]): number => {
  const monkeyCopy = [...monkeys];
  monkeyCopy.sort((a, b) => b.inspectCount - a.inspectCount);
  return monkeyCopy[0].inspectCount * monkeyCopy[1].inspectCount;
}

export const answer1 = () => {
  const content = readFileSync(file).toString();
  const monkeyInputs = content.split('\n\n');
  const monkeyDescriptions: MonkeyDescription[] = generateEntries(monkeyInputs, generateMonkeyDescription);
  const monkeys = monkeyDescriptions.map(desc => new Monkey(desc));

  runRounds(monkeys, 20);
  return calculateMonkeyBusiness(monkeys);
};

export const runRoundsModuloSearch = (monkeys: Monkey[], rounds: number) => {
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      const throws = monkey.inspectItems();
      for (const itemThrow of throws) {
        monkeys[itemThrow.monkey].throwAtMe(itemThrow.item);
      }
    }
  }
}

export const getModulo = (monkeys: MonkeyDescription[]): number => {
  let modulo = 1;
  monkeys.forEach(desc => {
    const stringValue = desc.test.test.replace('divisible by ', '');
    const divisibleBy = Number(stringValue);
    modulo = modulo * divisibleBy;
  });
  return modulo
} 

export const answer2 = () => {
  const content = readFileSync(file).toString();
  const monkeyInputs = content.split('\n\n');
  const monkeyDescriptions: MonkeyDescription[] = generateEntries(monkeyInputs, generateMonkeyDescription);
  let modulo = getModulo(monkeyDescriptions);
  const monkeys = monkeyDescriptions.map(desc => new Monkey(desc, modulo));

  runRounds(monkeys, 10000);
  return calculateMonkeyBusiness(monkeys);
};

const val = answer2();
console.log("Answer 2:")
console.log(val);
