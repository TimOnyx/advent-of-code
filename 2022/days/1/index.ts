// read file
const fs = require('fs');

let content: string = '';
const readFile2 = (next: Function) => {
  fs.readFile('days/1/input.txt', 'utf8', function(err: unknown, data: string) {
    if (err) throw err;
    content = data;
    next();
  }); 
}

const processFile2 = () => {
  const inputByElf = splitElves(content);
  const elfInventories = generateElfEnventories(inputByElf);
  // PT 1 answer
  const richElf = getRichestElf(elfInventories);
  console.log("Anwser 1:", richElf.total);
  // PT 2 answer
  const richElves = getRichElves(elfInventories, 3);
  let total = 0;
  for (const elf of richElves) {
    total += elf.total;
  }
  console.log("Answer 2:", total);
}

const splitElves = (content: string): string[] => {
  return content.split('\n\n');
}

interface Elf {
  inventory: number[];
  total: number;
}

const generateElfEnventories = (inputByElf: string[]): Elf[] => {
  const elves: Elf[] = [];
  for (const input of inputByElf) {
    const inventory = generateInventory(input.split('\n'));
    const total = calculateTotal(inventory);
    elves.push({
      inventory,
      total
    });
  }
  return elves;
}

const generateInventory = (input: string[]): number[] => {
  return input.map(a => Number(a));
}

const calculateTotal = (inventory: number[]) => {
  let total = 0;
  for(const value of inventory) {
    total += value;
  }
  return total;
}

const getRichestElf = (elves: Elf[]): Elf => {
  let richBoi = elves[0]
  for (const elf of elves) {
    if (elf.total > richBoi.total) {
      richBoi = elf;
    }
  }

  return richBoi;
}

const getRichElves = (elves: Elf[], amount: number): Elf[] => {
  const clone = [...elves];
  const richBois: Elf[] = clone.splice(0, amount);
  const sortElves = () => richBois.sort((a, b) => b.total - a.total);
  sortElves();
  const replaceElf = (elf: Elf) => {
    richBois.pop();
    richBois.push(elf);
    sortElves();
  }
  for (const elf of clone) {
    let leastRichBoi = richBois[amount - 1];
    if (elf.total > leastRichBoi.total) {
      replaceElf(elf);
    }
  }

  return richBois;
}

readFile2(processFile2);