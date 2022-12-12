// read file
import { generateEntries, readFile, splitLines } from '../util/fileProcessing';

interface Item {
  code: string;
  priority: number;
}

interface Entry {
  itemCodes: string[];
  items: Item[];
}

const alp = 'abcdefghijklmnopqrstuvwxyz'
const priority = alp + alp.toUpperCase();

const getPriorityForCode = (code: string): number => {
  return priority.indexOf(code) + 1;
}

const generateEntryDay3 = (line: string): Entry => {
  const itemCodes = line.split('');
  return {
    itemCodes,
    items: itemCodes.map(code => ({
      code,
      priority: getPriorityForCode(code),
    }))
  };
}

const getDuplicateItem = (entry: Entry): Item => {
  const itemCount = entry.items.length;
  const firstHalf = entry.items.slice(0, itemCount / 2);
  const secondHalf = entry.items.slice(itemCount / 2);

  const duplicateItem = firstHalf.find(firstItem => {
    const match = secondHalf.find(secondItem => {
      if (firstItem.code === secondItem.code) {
        return true;
      }
    });

    if (match) {
      return true;
    }

    return false;
  });

  return duplicateItem!;
}

const getGroups = (entries: Entry[]): Entry[][] => {
  const groups: Entry[][] = [];
  let groupIndex = 0;
  let groupCount = 0;

  for (const entry of entries) {
    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }
    groups[groupIndex].push(entry);
    groupCount ++;

    if( groupCount === 3) {
      groupCount = 0;
      groupIndex ++;
    }
  }

  return groups;
};

const getBadgeFromGroup = (group: Entry[]): Item => {
  const [elf1, elf2, elf3] = group;

  const duplicateItem = elf1.items.find(firstItem => {
    const match = elf2.items.find(secondItem => {
      if (firstItem.code === secondItem.code) {
        return true;
      }
    });

    if (!match) {
      return false;
    }

    const match2 = elf3.items.find(secondItem => {
      if (firstItem.code === secondItem.code) {
        return true;
      }
    });

    if (!match2) {
      return false;
    }

    return true;
  });

  return duplicateItem!;
};

readFile('days/3/input.txt', (content: string) => {
  const lines = splitLines(content);
  const entries = generateEntries(lines, generateEntryDay3);
  const duplicates = entries.map(getDuplicateItem);
  let fullScore = 0
  duplicates.forEach(duplicate => {
    fullScore += duplicate.priority;
  })
  console.log("Anwser 1:", fullScore);
  
  const groups = getGroups(entries);
  const badges = groups.map(getBadgeFromGroup);
  let badgesCount = 0
  badges.forEach(badge => {
    console.log(badge.code, '=>', badge.priority);
    badgesCount += badge.priority;
  })
  console.log("Anwser 2:", badgesCount);

  // 2118 is too low

});