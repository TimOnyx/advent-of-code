import { readFileSync } from "fs";
import { Command, generateCommand } from './CommandGenerator';
import { handleCommand } from './CommandHandler';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { sortResults } from './sortResults';
import { calculateBids } from './calculateBids';
import { getTotal } from './getTotal';

const day = 7;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();

describe(`[Day ${day}] part 1`, () => {
  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });
  describe('Generate a command from a line', () => {
    const command = generateCommand('KK677 28');
    test('Generate the bid', () => {
      expect(command.bid).toEqual(28);
    });
    
    test('Generate the cards', () => {
      expect(command.cards).toEqual(['K', 'K', '6', '7', '7']);
    });
  })
  
  describe('Handle a command', () => {
    describe('Describes the hand', () => {
      test('5 of a kind', () => {
        const command = generateCommand('KKKKK 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('5-of-a-kind');
      });
      test('4 of a kind', () => {
        const command = generateCommand('KKAKK 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('4-of-a-kind');
      });
      test('full house', () => {
        const command = generateCommand('AKAKK 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('full-house');
      });
      test('3 of a kind', () => {
        const command = generateCommand('2KAKK 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('3-of-a-kind');
      });
      test('2 pair', () => {
        const command = generateCommand('2KAAK 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('2-pair');
      });
      test('1 pair', () => {
        const command = generateCommand('2K3AK 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('1-pair');
      });
      test('high card', () => {
        const command = generateCommand('2K3A4 28');
        const result = handleCommand([], command);
        expect(result.description).toBe('high-card');
      });
    });
  })
  
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  const results = commands.map(command => handleCommand([], command));
  const sorted = sortResults(results);
  describe('orders commands by strength', () => {
    // 32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
    // KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
    // T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
    test('orders the commands on description', () => {
      expect(sorted[0].description).toBe('1-pair');
      expect(sorted[1].description).toBe('2-pair');
      expect(sorted[2].description).toBe('2-pair');
      expect(sorted[3].description).toBe('3-of-a-kind');
      expect(sorted[4].description).toBe('3-of-a-kind');
    });

    test('orders the commands on first card strength', () => {
      expect(sorted[0].bid).toBe(765);
      expect(sorted[1].bid).toBe(220);
      expect(sorted[2].bid).toBe(28);
      expect(sorted[3].bid).toBe(684);
      expect(sorted[4].bid).toBe(483);
    });
  })

  describe('Calculate bid per card', () => {
    const bids = calculateBids(sorted);
    
    test('bids are calculated', () => {
      expect(bids[0]).toBe(765 * 1);
      expect(bids[1]).toBe(220 * 2);
      expect(bids[2]).toBe(28 * 3);
      expect(bids[3]).toBe(684 * 4);
      expect(bids[4]).toBe(483 * 5);
    });
    
  });
  
  test('Count total of bids', () => {
    const bids = [
      765 * 1,
      220 * 2,
      28 * 3,
      684 * 4,
      483 * 5,
    ];

    const total = getTotal(bids);
    expect(total).toEqual(6440);
  })
})
