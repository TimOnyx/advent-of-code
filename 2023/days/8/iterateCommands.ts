import { OptionCommand } from './OptionCommandsGenerator';
import { DirectionCommandResult } from './DirectionCommandHandler';
import { handleOptionCommand } from './OptionCommandHandler';

export const iterateCommands = (optionCommands: OptionCommand[], directionResult: DirectionCommandResult) => {
  const map: Record<string, OptionCommand> = {};
  for (const optionCommand of optionCommands) {
    map[optionCommand.name] = optionCommand;
  }

  let currentCommand = map['AAA'];
  let currentResult = 'AAA';
  let stepCount = 0;
  while (currentResult !== 'ZZZ') {
    currentCommand = map[currentResult];
    currentResult = handleOptionCommand(stepCount, currentCommand, directionResult).goTo;
    stepCount++;
  }
  return stepCount;
};
