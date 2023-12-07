import { CommandResult } from './CommandHandler';

export const calculateBids = (
  sorted: CommandResult[]
) => {
  return sorted.map((result, index) => {
    return result.bid * (index + 1);
  });
};
