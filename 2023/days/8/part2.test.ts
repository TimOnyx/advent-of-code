import { readFileSync } from "fs";
import { generateDirectionCommand } from './DirectionCommandsGenerator';
import { OptionCommand, generateOptionCommands } from './OptionCommandsGenerator';
import { handleDirectionCommand } from './DirectionCommandHandler';
import { handleOptionCommand } from './OptionCommandHandler';
import { iterateCommands } from './iterateCommands';
import { iterateGhostlyCommands } from './iterateGhostlyCommands';

const day = 8;
const example = `2023/days/${day}/example3.txt`;
const content = readFileSync(example).toString();

describe(`[Day ${day}] part 2`, () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();
  });

  test('Completes example 1 in 2 steps', () => {
    const directionCommand = generateDirectionCommand(content);
    const optionCommands = generateOptionCommands(content);
    const directionResult = handleDirectionCommand([], directionCommand);
    
    let stepCount = iterateGhostlyCommands(optionCommands, directionResult);
    expect(stepCount).toBe(6);
  });
})
