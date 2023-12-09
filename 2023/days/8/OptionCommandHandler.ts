import { DirectionCommandResult } from './DirectionCommandHandler';
import { DirectionCommand } from './DirectionCommandsGenerator';
import { OptionCommand } from './OptionCommandsGenerator';

export interface CommandResult {
  goTo: string;
}

export const handleOptionCommand = (
  index: number,
  command: OptionCommand,
  directionResult: DirectionCommandResult,
): CommandResult => {
  const direction = directionResult.directionFor(index);
  return {
    goTo: command.directions[direction],
  };
};
