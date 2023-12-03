import { CommandPartResult } from './PartCommandHandler';

export const getTotal = (results: CommandPartResult[]): number => {
  let total = 0;
  for (const result of results) {
    if (result.isPart) {
      total += result.value;
    }
  }
  return total;
};
