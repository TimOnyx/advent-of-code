import { CommandResult } from './CommandHandler';

export const getTotal = (results: Omit<CommandResult, 'power'>[]): number => {
  let total = 0;
  for (const result of results) {
    if (result.possible) {
      total += result.id;
    }
  }
  return total;
};
