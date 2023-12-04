import { CommandResult } from './CommandHandler';

export const generateCopies = (results: CommandResult[]) => {
  const newResults = [...results];

  for (const result of newResults) {
    for (const copy of result.copiedCards) {
      newResults.push(results[copy - 1]);
    }
  }
  return newResults;
};
