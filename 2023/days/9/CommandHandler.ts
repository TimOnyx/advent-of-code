import { Command } from './CommandGenerator';


export interface CommandResult {
  nextValue: number;
}

export const handleCommand = (
  resuls: CommandResult[], command: Command
): CommandResult => {
  let currentValues = command.values;
  let all0 = false;
  const outerDifferences = [];
  while (!all0) {
    const innerDifferences = [];
    all0 = true;
    for (let i = 1; i < currentValues.length; i++) {
      const prevValue = currentValues[i - 1];
      const value = currentValues[i];
      const difference = value - prevValue;
      innerDifferences.push(difference);
      if (difference) {
        all0 = false;
      }
    }

    currentValues = innerDifferences;
    outerDifferences.push(innerDifferences);
  }

  let valueToAdd = 0;
  for (const differences of outerDifferences) {
    const lastValue = differences[differences.length - 1];
    const nextValue = lastValue + valueToAdd;
    differences.push(nextValue);
    valueToAdd = nextValue;
  }

  const lastValue = command.values[command.values.length - 1];

  return {
    nextValue: lastValue + valueToAdd,
  };
};
