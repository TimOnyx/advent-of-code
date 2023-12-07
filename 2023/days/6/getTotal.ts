import { CommandResult } from './CommandHandler';

export const getTotal = (result: CommandResult): number => {
  let total = -1;
  for (const race of result.races) {
    if (total === -1) {
      total = race.options;
    } else {
      total = total * race.options;
    }
  }
  return total;
};
