// read file
import { readFileSync } from 'fs';
import { generateDirectionCommand } from './DirectionCommandsGenerator';
import { generateOptionCommands } from './OptionCommandsGenerator';
import { handleDirectionCommand } from './DirectionCommandHandler';
import { iterateCommands } from './iterateCommands';
import { iterateGhostlyCommands } from './iterateGhostlyCommands';

const input = './input.txt';

export const answer = (input: string) => {
  const content = readFileSync(input).toString();
  const directionCommand = generateDirectionCommand(content);
  const optionCommands = generateOptionCommands(content);
  const directionResult = handleDirectionCommand([], directionCommand);
  
  let stepCount = iterateCommands(optionCommands, directionResult);
  console.log({stepCount});

  // Note: Original solution took too long, so I checked the Reddit.
  // Turns out you can use 'Least Common Multiple' to find the answer.
  // Technically it's not correct, but it works for this puzzle.
  // Code below is my original solution, slightly modified to give the different
  // step counts for each start point, so I could manually find the LCM.
  let ghostStepCount0 = iterateGhostlyCommands(0, optionCommands, directionResult);
  let ghostStepCount1 = iterateGhostlyCommands(1, optionCommands, directionResult);
  let ghostStepCount2 = iterateGhostlyCommands(2, optionCommands, directionResult);
  let ghostStepCount3 = iterateGhostlyCommands(3, optionCommands, directionResult);
  let ghostStepCount4 = iterateGhostlyCommands(4, optionCommands, directionResult);
  let ghostStepCount5 = iterateGhostlyCommands(5, optionCommands, directionResult);
  console.log({
    ghostStepCount0,
    ghostStepCount1,
    ghostStepCount2,
    ghostStepCount3,
    ghostStepCount4,
    ghostStepCount5,
  });
  // Fuck this puzzle specifically.
};

answer(input);
