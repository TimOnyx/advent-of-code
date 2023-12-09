import { OptionCommand } from './OptionCommandsGenerator';
import { DirectionCommandResult } from './DirectionCommandHandler';
import { handleOptionCommand } from './OptionCommandHandler';

export const iterateGhostlyCommands = (index: number, optionCommands: OptionCommand[], directionResult: DirectionCommandResult) => {
  const map: Record<string, OptionCommand> = {};
  const starts: string[] = [];
  for (const optionCommand of optionCommands) {
    const lastLetter = optionCommand.name[2];
    if (lastLetter === 'A') {
      starts.push(optionCommand.name);
    }
    map[optionCommand.name] = optionCommand;
  }

  let currentResults = [...starts];
  let stepCount = 0;
  let allEndWithZ = false;
  while (!allEndWithZ) {
    let internalAllEndWithZ = true;
    const currentResult = currentResults[index];
    const currentCommand = map[currentResult]
    currentResults[index] = handleOptionCommand(stepCount, currentCommand, directionResult).goTo;
    const lastLetter = currentResults[index][2];
    if (lastLetter !== 'Z') {
      internalAllEndWithZ = false;
    }
    // }
    allEndWithZ = internalAllEndWithZ;
    stepCount++;
  }
  return stepCount;
};
