import { readFileSync } from "fs";
import { generateSeedCommand } from './SeedCommandGenerator';

const day = 5;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();

describe(`[Day ${day}] part 2`, () => {
  describe('Generates commands from a text', () => {
    describe('Generates commands from seeds', () => {
      const command = generateSeedCommand('seeds: 79 14 55 13');
      test('Capture the seeds', () => {
        expect(command.seedRanges.length).toBe(
          2
        );
        expect(command.seedRanges[0]).toEqual({
          start: 79,
          length: 14,
        });
      });
    });
  })
})
