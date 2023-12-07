import { CommandResult } from './CommandHandler';

const valueForSymbol: Record<string, number> = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
};

const valueForSymbolJ: Record<string, number> = {
  ...valueForSymbol,
  'J': 1,
}

const sortPerLetter = (a: CommandResult, b: CommandResult) => {
  if(a.cards.join() === b.cards.join()) {
    return 0;
  }

  for (let i = 0; i < a.cards.length; i++) {
    const letterA = a.cards[i];
    const letterB = b.cards[i];
    if (letterA === letterB) {
      continue;
    }

    const valueA = valueForSymbol[letterA];
    const valueB = valueForSymbol[letterB];
    return valueA - valueB;
  }
  
  return 0;
}

const sortPerLetterAlt = (a: CommandResult, b: CommandResult) => {
  if(a.cards.join() === b.cards.join()) {
    return 0;
  }

  for (let i = 0; i < a.cards.length; i++) {
    const letterA = a.cards[i];
    const letterB = b.cards[i];
    if (letterA === letterB) {
      continue;
    }

    const valueA = valueForSymbolJ[letterA];
    const valueB = valueForSymbolJ[letterB];
    return valueA - valueB;
  }
  
  return 0;
}

export const sortResults = (results: CommandResult[], key: 'description' | 'altDescription' = 'description'): CommandResult[] => {
  const map: Record<string, CommandResult[]> = {
    'high-card': [],
    '1-pair': [],
    '2-pair': [],
    '3-of-a-kind': [],
    'full-house': [],
    '4-of-a-kind': [],
    '5-of-a-kind': [],
  };

  for (const result of results) {
    map[result[key]].push(result);
  }

  map['high-card'].sort(sortPerLetterAlt);
  map['1-pair'].sort(sortPerLetterAlt)
  map['2-pair'].sort(sortPerLetterAlt)
  map['3-of-a-kind'].sort(sortPerLetterAlt)
  map['full-house'].sort(sortPerLetterAlt)
  map['4-of-a-kind'].sort(sortPerLetterAlt)
  map['5-of-a-kind'].sort(sortPerLetterAlt)

  return [
    ...map['high-card'],
    ...map['1-pair'],
    ...map['2-pair'],
    ...map['3-of-a-kind'],
    ...map['full-house'],
    ...map['4-of-a-kind'],
    ...map['5-of-a-kind'],
  ];
}
