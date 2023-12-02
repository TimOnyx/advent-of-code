import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';

const example = '2023/days/1/example.txt';
const content = readFileSync(example).toString();

describe('[Day 1] part 1', () => {
  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });
  test('Generate a command from a line', () => {
    const command = generateCommand('pqr3stu8vwx');
    expect(command).toEqual({
      firstDigit: 3,
      lastDigit: 8,
    });
  })
  test('Handle a command', () => {
    const command = {
      firstDigit: 3,
      lastDigit: 8,
    };
    const result = handleCommand([], command);
    expect(result).toEqual({
      total: 38,
    });
  })
  test('Handle a list of commands', () => {
    const commands = [
      {
        firstDigit: 3,
        lastDigit: 8,
      },
      {
        firstDigit: 4,
        lastDigit: 9,
      },
    ];
    const results = handleCommands<Command, CommandResult>(
      commands, 
      handleCommand
    );
    expect(results).toEqual([
      {
        total: 38,
      },
      {
        total: 49,
      },
    ]);
  })
  test('Count total of command results', () => {
    const results = [
      {
        total: 12,
      },
      {
        total: 38,
      },
      {
        total: 15,
      },
      {
        total: 77,
      },
    ];

    const total = getTotal(results);
    expect(total).toEqual(142);
  });
})