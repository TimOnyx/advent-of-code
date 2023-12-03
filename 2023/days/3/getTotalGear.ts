import { CommandGearResult } from './GearCommandHandler';

export const getTotalGear = (results: CommandGearResult[]): number => {
  let total = 0;
  for (const result of results) {
    if (result.isGear) {
      total += result.value;
    }
  }
  return total;
};
