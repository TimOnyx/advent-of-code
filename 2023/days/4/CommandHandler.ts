import { Command } from './CommandGenerator';


export interface CommandResult {
  winCount: number;
  pointTotal: number;
  copiedCards: number[];
}

export const handleCommand = (
  resuls: CommandResult[], command: Command
): CommandResult => {
  const winningNumbers = new Set(command.winningNumbers);

  let winCount = 0;
  for (const number of command.yourNumbers) {
    if (winningNumbers.has(number)) {
      winCount++;
    }
  }

  let pointTotal = 0;
  const copiedCards = [];

  if (winCount) {
    pointTotal = 1;
    copiedCards.push(command.gameId + 1);
  }

  if (winCount > 1) {
    // for every point past the first, multiply by 2
    for (let i = 1; i < winCount; i++) {
      pointTotal = pointTotal * 2;
      copiedCards.push(command.gameId + 1 + i);
    }
  }

  return {
    winCount,
    pointTotal,
    copiedCards,
  };
};
