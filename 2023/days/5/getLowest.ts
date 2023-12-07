import { LocationCommandResult } from './LocationCommandHandler';

export const getLowest = (results: LocationCommandResult[]): number => {
  let lowest = results[0].location;
  for (const result of results) {
    if (result.location < lowest) {
      lowest = result.location;
    }
  }
  return lowest;
};
