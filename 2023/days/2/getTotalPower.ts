import { CommandResult } from './CommandHandler';

export const getTotalPower = (results: CommandResult[]): number => {
  let total = 0;
  for (const result of results) {
    total += result.power;
  }
  return total;
};
