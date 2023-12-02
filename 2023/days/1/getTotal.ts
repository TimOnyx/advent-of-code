import { CommandResult } from './CommandHandler';

export const getTotal = (results: CommandResult[]): number => {
  let total = 0;
  for (const result of results) {
    total += result.total;
  }
  return total;
};
