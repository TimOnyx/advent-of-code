import { readFileSync } from "fs";
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { getTotal } from './getTotal';
import { handleCommands } from '../../utils/handleCommands';
import { reverseValues } from './reverseValues';

const day = 9;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();

describe(`[Day ${day}] part 1`, () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });

  describe('Generates commands from input', () => {
    describe('1 line', () => {
      const command = generateCommand('0 3 6 9 12 15');
      test('Capture the values', () => {
        expect(command.values).toEqual([
          0, 3, 6, 9, 12, 15
        ]);
      });
      test('Generates commands from example', () => {
        const commands = generateEntries(splitLines(content), generateCommand);
        expect(commands.length).toBe(3);
      });
    });
  })

  describe('Handle a command', () => {
    test('Handle a linear command', () => {
      const command = generateCommand('0 3 6 9 12 15');
      const result = handleCommand([], command);
      expect(result.nextValue).toBe(18);
    })
    test('Handle a complexer command', () => {
      const command = generateCommand('10 13 16 21 30 45');
      const result = handleCommand([], command);
      expect(result.nextValue).toBe(68);
    })
  })

  test('Calculate total from example', () => {
    const results: CommandResult[] = [
      {
        nextValue: 18,
      },
      {
        nextValue: 28,
      },
      {
        nextValue: 68,
      },
    ];
    const total = getTotal(results);
    expect(total).toEqual(114);
  });

  describe('Calculate example', () => {
    const commands = generateEntries(splitLines(content), generateCommand);
    test('Calculate commands', () => {
      const results = handleCommands<Command, CommandResult>(commands, handleCommand);
      expect(getTotal(results)).toBe(114);
    });
    test('Calculate commands in reverse', () => {
      const reversedCommands = reverseValues(commands);
      const results = handleCommands<Command, CommandResult>(reversedCommands, handleCommand);
      expect(getTotal(results)).toBe(2);
    });
  });
})
