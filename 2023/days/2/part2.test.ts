import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { handleCommands } from '../../utils/handleCommands';
import { CommandResult, handleCommand } from './CommandHandler';
import { getTotal } from './getTotal';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { getTotalPower } from './getTotalPower';

const example = '2023/days/2/example.txt';
const content = readFileSync(example).toString();

describe('[Day 2] part 2', () => {
  describe('Generate a command from a line', () => {
    const command = generateCommand('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');
    test('Generate the minimum gems', () => {
      expect(command.minimumGems).toEqual({
        red: 4,
        green: 2,
        blue: 6,
      });
    });
  })

  describe('Handle a command', () => {
    test('Calculates the power', () => {
      const command = {
        id: 1,
        rounds: [],
        minimumGems: {
          red: 4,
          green: 2,
          blue: 6,
        }
      };
  
      const result = handleCommand([], command);
      expect(result.power).toBe(48);
    });
  });

  test('Count total of command results', () => {
    const results = [
      {
        id: 1,
        possible: false,
        power: 48,
      },
      {
        id: 2,
        possible: false,
        power: 12,
      },
      {
        id: 3,
        possible: false,
        power: 1560,
      },
      {
        id: 4,
        possible: false,
        power: 630,
      },
      {
        id: 5,
        possible: false,
        power: 36,
      },
    ];

    const total = getTotalPower(results);
    expect(total).toEqual(2286);
  });
});
