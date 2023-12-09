import { DirectionCommand } from './DirectionCommandsGenerator';

export interface DirectionCommandResult {
  directionFor: (i: number) => 'L' | 'R';
}

export const handleDirectionCommand = (
  results: DirectionCommandResult[], command: DirectionCommand
): DirectionCommandResult => {

  const directions = command.directions;
  const directionLength = directions.length;

  const directionFor = (i: number) => {
    const modulo = i % directionLength;
    return directions[modulo] as 'L' | 'R';
  };

  return {
    directionFor,
  };
};
