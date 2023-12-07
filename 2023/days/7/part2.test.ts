import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { sortResults } from './sortResults';
import { calculateBids } from './calculateBids';
import { getTotal } from './getTotal';
import { handleCommands } from '../../utils/handleCommands';

const day = 7;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();

function testLine(describe: string, input: string, expected: string) {
  test(describe, () => {
    const command = generateCommand(input);
    const result = handleCommand([], command);
    expect(result.altDescription).toBe(expected);
  });
}


describe(`[Day ${day}] part 2`, () => {
  describe('Handle a command', () => {
    describe('Describes the hand', () => {
      testLine('5 of a kind with J', 'JKJKJ 28', '5-of-a-kind');
      testLine('4 of a kind with J', 'JKAKK 28', '4-of-a-kind');
      testLine('3 of a kind with J', '2JAKK 28', '3-of-a-kind');
      testLine('1 pair with J', '2J3AK 28', '1-pair');
      
      describe('example lines', () => {
        testLine('line 1', '32T3K 768', '1-pair');
        testLine('line 2', 'T55J5 684', '4-of-a-kind');
        testLine('line 3', 'KK677 28', '2-pair');
        testLine('line 4', 'KTJJT 220', '4-of-a-kind');
        testLine('line 5', 'QQQJA 483', '4-of-a-kind');
      });

      describe('lines from real input', () => {
        // 536K8
        testLine('536K8', '536K8 291', 'high-card');
        // 3T3T3
        testLine('3T3T3', '3T3T3 765', 'full-house');
        // J8JJ3
        testLine('J8JJ3', 'J8JJ3 765', '4-of-a-kind');
        // JJQJQ
        testLine('JJQJQ', 'JJQJQ 171', '5-of-a-kind');
        // 2222Q
        testLine('2222Q', '2222Q 28', '4-of-a-kind');
        // JJJJJ
        testLine('JJJJJ', 'JJJJJ 28', '5-of-a-kind');
      });
    });
  })
  
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  const results = commands.map(command => handleCommand([], command));
  const sorted = sortResults(results, 'altDescription');
  describe('orders commands by strength', () => {
    test('orders the commands on first card strength', () => {
      expect(sorted[0].bid).toBe(765);
      expect(sorted[1].bid).toBe(28);
      expect(sorted[2].bid).toBe(684);
      expect(sorted[3].bid).toBe(483);
      expect(sorted[4].bid).toBe(220);
    });
  })

  test('calculates part 2 for example', () => {
    const lines = splitLines(content);
    const commands: Command[] = generateEntries(lines, generateCommand);
    const results = handleCommands<Command, CommandResult>(commands, handleCommand);
    const sorted = sortResults(results, 'altDescription');
    const bids = calculateBids(sorted);
    const total = getTotal(bids);
    expect(total).toBe(5905);
  })
})
