export interface Command {
  bid: number;
  cards: string[];
}

export const generateCommand = (line: string): Command => {
  // KK677 28
  let commandString = line;

  // cardString = 'KK677'
  // bidString = '28'
  const [cardString, bidString] = commandString.split(' ');
  const cards = cardString.split('');
  const bid = Number(bidString);

  return {
    bid,
    cards,
  };
};
