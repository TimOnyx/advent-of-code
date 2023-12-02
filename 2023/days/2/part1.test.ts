import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { handleCommands } from '../../utils/handleCommands';
import { CommandResult, handleCommand } from './CommandHandler';
import { getTotal } from './getTotal';
import { generateEntries, splitLines } from '../../utils/fileProcessing';

const example = '2023/days/2/example.txt';
const content = readFileSync(example).toString();

describe('[Day 2] part 1', () => {
  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });
  describe('Generate a command from a line', () => {
    const command = generateCommand('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');
    test('Generate an id', () => {
      expect(command.id).toEqual(1);
    });

    test('Generate the rounds', () => {
      expect(command.rounds.length).toBe(3);
    });

    test('Rounds contain the gems', () => {
      expect(command.rounds[1]).toEqual({
        red: 1,
        green: 2,
        blue: 6,
      });
    });
  })

  describe('Handle a command', () => {
    test('Can be impossible', () => {
      const command = {
        id: 1,
        rounds: [
          {
            red: 20,
            green: 8,
            blue: 6,
          },
        ],
        minimumGems: {
          red: 0,
          green: 0,
          blue: 0,
        }
      };
  
      const result = handleCommand([], command);
      expect(result.possible).toBeFalsy();
    });
    test('Can be possible', () => {
      const command = {
        id: 1,
        rounds: [
          {
            red: 2,
            green: 8,
            blue: 6,
          },
        ],
        minimumGems: {
          red: 0,
          green: 0,
          blue: 0,
        }
      };
  
      const result = handleCommand([], command);
      expect(result.possible).toBeTruthy();
    });
  })
  test('Count total of command results', () => {
    const results = [
      {
        id: 1,
        possible: false,
      },
      {
        id: 2,
        possible: true,
      },
      {
        id: 3,
        possible: false,
      },
      {
        id: 4,
        possible: true,
      },
    ];

    const total = getTotal(results);
    expect(total).toEqual(6);
  });
  test('Can handle example', () => {
    const lines = splitLines(content);
    const commands: Command[] = generateEntries(lines, generateCommand);
    const results = handleCommands<Command, CommandResult>(commands, handleCommand);
    const total = getTotal(results);
    expect(total).toEqual(8);
  });
  describe('Check some inputs', () => {
    // From input
    testLineFromInput(
      'Game 1: 1 blue, 2 green, 3 red; 7 red, 8 green; 1 green, 2 red, 1 blue; 2 green, 3 red, 1 blue; 8 green, 1 blue',
      { id: 1, possible: true }
    );

    testLineFromInput(
      'Game 2: 12 blue, 3 green, 5 red; 1 green, 1 blue, 8 red; 2 green, 12 blue, 5 red; 7 red, 2 green, 13 blue',
      { id: 2, possible: true },
    );

    testLineFromInput(
      'Game 3: 7 red, 4 blue, 13 green; 14 green, 1 blue, 1 red; 1 red, 11 green, 5 blue; 10 green, 3 blue, 3 red; 5 red, 5 blue, 3 green',
      { id: 3, possible: false },
    );

    testLineFromInput(
      'Game 4: 3 red, 1 green, 17 blue; 11 red, 6 green, 18 blue; 4 red, 9 blue, 5 green; 2 blue, 2 green, 1 red; 1 red, 2 green; 7 green, 9 red, 2 blue',
      { id: 4, possible: false },
    );

    testLineFromInput(
      'Game 5: 1 blue, 9 green, 5 red; 12 green, 1 blue, 15 red; 17 green, 8 red, 4 blue; 7 green, 12 red',
      { id: 5, possible: false },
    );

    testLineFromInput(
      'Game 6: 4 blue, 9 green, 7 red; 1 red, 7 green, 4 blue; 4 blue, 8 green, 3 red; 2 green, 1 red, 2 blue',
      { id: 6, possible: true },
    );

    testLineFromInput(
      'Game 7: 3 green, 1 blue; 11 red, 2 blue; 2 red, 3 blue, 6 green',
      { id: 7, possible: true },
    );

    testLineFromInput(
      'Game 8: 8 blue, 1 red, 11 green; 11 blue, 10 red, 7 green; 4 blue, 6 green, 4 red; 3 blue, 2 green, 6 red; 4 green, 4 red, 1 blue; 5 blue, 12 red, 9 green',
      { id: 8, possible: true },
    );
    
    testLineFromInput(
      'Game 9: 2 green, 20 blue, 4 red; 3 green, 7 red, 2 blue; 3 green, 17 blue; 20 blue, 7 red, 2 green; 4 green, 6 red, 1 blue; 7 red, 5 green, 19 blue',
      { id: 9, possible: false },
    );

    // Not from input
    testLineFromInput(
      'Game 11: 2 green',
      { id: 11, possible: true },
    );

    testLineFromInput(
      'Game 100: 2 green',
      { id: 100, possible: true },
    );

    testLineFromInput(
      'Game 100: 12 red, 13 green, 14 blue',
      { id: 100, possible: true },
    );

    testLineFromInput(
      'Game 100: 13 red, 13 green, 14 blue',
      { id: 100, possible: false },
    );

    testLineFromInput(
      'Game 100: 12 red, 14 green, 14 blue',
      { id: 100, possible: false },
    );

    testLineFromInput(
      'Game 100: 12 red, 13 green, 15 blue',
      { id: 100, possible: false },
    );

    testLineFromInput(
      'Game 100: 12 red; 15 blue',
      { id: 100, possible: false },
    );

    testLineFromInput(
      'Game 100: 16 red; 12 blue',
      { id: 100, possible: false },
    );
  });
})

function testLineFromInput(line: string, expected: Omit<CommandResult, 'power'>) {
  test('Check 1', () => {
    const command = generateCommand(line);
    const result = handleCommand([], command);
    expect(result.id).toBe(expected.id);
    expect(result.possible).toBe(expected.possible);
  });
}
