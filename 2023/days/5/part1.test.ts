import { readFileSync } from "fs";
import { SeedCommand, generateSeedCommand } from './SeedCommandGenerator';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { handleCommands } from '../../utils/handleCommands';
import { generateMapCommand } from './MapCommandGenerator';
import { generateCommands } from './CommandsGenerator';
import { MapCommandResult, handleMapCommand } from './MapCommandHandler';
import { LocationCommandResult, handleLocationCommand } from './LocationCommandHandler';
import { getLowest } from './getLowest';
import { generateMaps } from './generateMaps';

const day = 5;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();

describe(`[Day ${day}] part 1`, () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });

  describe('Generates commands from a text', () => {
    describe('Generates commands from seeds', () => {
      const command = generateSeedCommand('seeds: 79 14 55 13');
      test('Capture the seeds', () => {
        expect(command.seeds).toEqual([
          79, 14, 55, 13
        ]);
      });
    });
    describe('Generates commands from maps', () => {
      const command = generateMapCommand(
`seed-to-soil map:
50 98 2
52 50 48`.split('\n')
        );
      test('Capture the from name', () => {
        expect(command.from).toBe('seed');
      });
      test('Capture the to name', () => {
        expect(command.to).toBe('soil');
      });
      test('Capture the ranges', () => {
        expect(command.ranges).toEqual([
          {
            startSource: 98,
            startTarget: 50,
            length: 2,
          },
          {
            startSource: 50,
            startTarget: 52,
            length: 48,
          },
        ]);
      });
    });
    describe('Generates commands from example', () => {
      const commands = generateCommands(content);
      test('Capture the seeds', () => {
        expect(commands.seedsCommand.seeds).toEqual([
          79, 14, 55, 13
        ]);
      });
      test('Capture the maps', () => {
        expect(commands.mapCommands.length).toBe(7);
      });
    });
  })

  describe('Handle a map command', () => {
    const command = generateMapCommand(
`seed-to-soil map:
50 98 2
52 50 48`.split('\n')
    );
    const result = handleMapCommand([], command);
    test('result has from and to', () => {
      expect(result.from).toBe('seed');
      expect(result.to).toBe('soil');
    });
    test('result can map ids', () => {
      expect(result.mapId(49)).toBe(49);
      expect(result.mapId(98)).toBe(50);
      expect(result.mapId(99)).toBe(51);
      expect(result.mapId(50)).toBe(52);
    });
  })

  test('Find the location for a seed', () => {
    const commands = generateCommands(content);
    const mapResults = handleCommands(commands.mapCommands, handleMapCommand);
    const maps: Record<string, MapCommandResult> = generateMaps(mapResults);
    const result = handleLocationCommand([], {
      seed: 79,
      maps,
    });

    expect(result.location).toBe(82);
  });

  test('Calculate total from example', () => {
    const results: LocationCommandResult[] = [
      {
        location: 82,
      },
      {
        location: 13,
      },
      {
        location: 55,
      },
      {
        location: 79,
      },
    ];
    const lowest = getLowest(results);
    expect(lowest).toEqual(13);
  });
})
