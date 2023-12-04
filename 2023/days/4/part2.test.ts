import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';
import { generateCopies } from './generateCopies';

const example = '2023/days/4/example.txt';
const content = readFileSync(example).toString();

describe('[Day 4] part 1', () => {

  describe('Generates commands from a line', () => {
    const command = generateCommand('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53');
    test('Capture the copied card numbers', () => {
      expect(command.gameId).toBe(1);
    });
  })

  describe('Handle a command', () => {
    const result = handleCommand([], {
      gameId: 1,
      winningNumbers: [1, 2, 3, 4, 5],
      yourNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
    });
    test('Copied cards are found', () => {
      expect(result.copiedCards).toEqual([
        2, 3, 4, 5, 6
      ]);
    });
  })

  test('Calculate total from example', () => {
    const lines = splitLines(content);
    const commands: Command[] = generateEntries(lines, generateCommand);
    const originalResults = handleCommands<Command, CommandResult>(commands, handleCommand);
    const newResults = generateCopies(originalResults);
    expect(newResults.length).toBe(30);
  });
})
