import { readFileSync } from "fs";
import { generateDirectionCommand } from './DirectionCommandsGenerator';
import { OptionCommand, generateOptionCommands } from './OptionCommandsGenerator';
import { handleDirectionCommand } from './DirectionCommandHandler';
import { handleOptionCommand } from './OptionCommandHandler';
import { iterateCommands } from './iterateCommands';

const day = 8;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();
const example2 = `2023/days/${day}/example2.txt`;
const content2 = readFileSync(example2).toString();

describe(`[Day ${day}] part 1`, () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();
  });
  test('Reads example2 file', () => {
    expect(content2).toBeDefined();
  });

  test('Generates direction command from text', () => {
    const commands = generateDirectionCommand(content);
    expect(commands.directions).toEqual([
      'R',
      'L',
    ]);
  })

  describe('Generates option commands from text', () => {
    const commands = generateOptionCommands(content2);
    test('command 1 name', () => {
      expect(commands[0].name).toBe('AAA');
    })
    test('command 1 options', () => {
      expect(commands[0].directions).toEqual({
        L: 'BBB',
        R: 'BBB',
      });
    })
    test('command 2 name', () => {
      expect(commands[1].name).toBe('BBB');
    })
    test('command 2 options', () => {
      expect(commands[1].directions).toEqual({
        L: 'AAA',
        R: 'ZZZ',
      });
    })
    test('command 3 name', () => {
      expect(commands[2].name).toBe('ZZZ');
    })
    test('command 3 options', () => {
      expect(commands[2].directions).toEqual({
        L: 'ZZZ',
        R: 'ZZZ',
      });
    })
  })

  describe('Handle a directions command', () => {
    const command = generateDirectionCommand(content);
    const result = handleDirectionCommand([], command);
    test('gives a direction for a number', () => {
      expect(result.directionFor(0)).toBe('R');
      expect(result.directionFor(1)).toBe('L');
      expect(result.directionFor(2)).toBe('R');
      expect(result.directionFor(3)).toBe('L');
    });
  })

  describe('Handle option commands', () => {
    const optionCommands = generateOptionCommands(content2);
    test('Given it goes L', () => {
      const fakeResult = {
        directionFor: (i: number) => 'L' as const,
      };
      const result = handleOptionCommand(0, optionCommands[1], fakeResult);
      expect(result.goTo).toBe('AAA');
    });
    test('Given it goes R', () => {
      const fakeResult = {
        directionFor: (i: number) => 'R' as const,
      };
      const result = handleOptionCommand(0, optionCommands[1], fakeResult);
      expect(result.goTo).toBe('ZZZ');
    });
  })

  test('Completes example 1 in 2 steps', () => {
    const directionCommand = generateDirectionCommand(content);
    const optionCommands = generateOptionCommands(content);
    const directionResult = handleDirectionCommand([], directionCommand);
    
    let stepCount = iterateCommands(optionCommands, directionResult);
    expect(stepCount).toBe(2);
  });

  test('Completes example 2 in 6 steps', () => {
    const directionCommand = generateDirectionCommand(content2);
    const optionCommands = generateOptionCommands(content2);
    const directionResult = handleDirectionCommand([], directionCommand);
    
    const map: Record<string, OptionCommand> = {};
    for (const optionCommand of optionCommands) {
      map[optionCommand.name] = optionCommand;
    }

    let stepCount = iterateCommands(optionCommands, directionResult);
    expect(stepCount).toBe(6);
  });
})


