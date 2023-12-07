import { Command } from './CommandGenerator';

export interface CommandResult {
  description: string;
  altDescription: string;
  cards: string[];
  bid: number;
}

export const handleCommand = (
  resuls: CommandResult[], command: Command
): CommandResult => {

  const counts = countCards(command.cards);
  const description = getDescription(counts);

  const countsAlt = countCardsAlt(command.cards);
  const altDescription = getDescription(countsAlt);

  return { 
    description,
    altDescription,
    cards: command.cards, 
    bid: command.bid,
  };
};

function countCards(cards: string[]) {
  const cardCounts: Record<string, number> = {
    'A': 0,
    'K': 0,
    'Q': 0,
    'J': 0,
    'T': 0,
    '9': 0,
    '8': 0,
    '7': 0,
    '6': 0,
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
  };

  for (const card of cards) {
    cardCounts[card]++;
  }

  return Object
    .values(cardCounts)
    .sort()
    .reverse();
}

function countCardsAlt(cards: string[]) {
  const cardCounts: Record<string, number> = {
    'A': 0,
    'K': 0,
    'Q': 0,
    'J': 0,
    'T': 0,
    '9': 0,
    '8': 0,
    '7': 0,
    '6': 0,
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
  };

  for (const card of cards) {
    cardCounts[card]++;
  }

  const JCount = cardCounts['J'];
  delete cardCounts['J'];

  const counts = Object
    .values(cardCounts)
    .sort()
    .reverse();

  counts[0] += JCount;

  return counts;
}

function getDescription(counts: number[]) {
  if (counts[0] === 5) {
    return '5-of-a-kind';
  }

  if (counts[0] === 4) {
    return '4-of-a-kind';
  }

  if (counts[0] === 3 && counts[1] === 2) {
    return 'full-house';
  }

  if (counts[0] === 3) {
    return '3-of-a-kind';
  }

  if (counts[0] === 2 && counts[1] === 2) {
    return '2-pair';
  }

  if (counts[0] === 2) {
    return '1-pair';
  }

  return 'high-card'
}

