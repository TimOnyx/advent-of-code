import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';

const example = '2023/days/4/example.txt';
const content = readFileSync(example).toString();

describe('[Day 4] part 1', () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });

  describe('Generates commands from a line', () => {
    const command = generateCommand('Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1');
    test('Capture the winning numbers', () => {
      expect(command.winningNumbers).toEqual([
        1, 21, 53, 59, 44
      ]);
    });

    test('Captures your numbers', () => {
      expect(command.yourNumbers).toEqual([
        69, 82, 63, 72, 16, 21, 14, 1
      ]);
    });
  })

  describe('Handle a command', () => {
    const result = handleCommand([], {
      gameId: 1,
      winningNumbers: [1, 2, 3, 4, 5],
      yourNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
    });
    test('Winning numbers are counted', () => {
      expect(result.winCount).toBe(5);
    });
    test('Points are calculated', () => {
      expect(result.pointTotal).toBe(16);
    });
  })

  test('Calculate total from example', () => {
    const lines = splitLines(content);
    const commands: Command[] = generateEntries(lines, generateCommand);
    const results = handleCommands<Command, CommandResult>(commands, handleCommand);
    const total = getTotal(results);
    expect(total).toEqual(13);
  });
})
