export interface Command {
  gameId: number;
  winningNumbers: number[];
  yourNumbers: number[];
}

export const generateCommand = (line: string): Command => {
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  let commandString = line;

  // Card 3: 1 21 53 59 44 | 69 82 63 72 16 21 14 1
  const withoutExtraSpaces = commandString.replace(/  /g, ' ');
  // Card 3: 
  // 1 21 53 59 44 | 69 82 63 72 16 21 14 1
  const [gameString, rest] = withoutExtraSpaces.split(': ');

  const gameId = Number(gameString.replace('Card ', ''));
  // 1 21 53 59 44
  // 69 82 63 72 16 21 14 1
  const [winningNumbersAsString, yourNumbersAsString] = rest.split(' | ');
  const winningNumbers = winningNumbersAsString.split(' ').map(Number);
  const yourNumbers = yourNumbersAsString.split(' ').map(Number);

  return {
    gameId,
    winningNumbers,
    yourNumbers,
  };
};
