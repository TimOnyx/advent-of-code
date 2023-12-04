import { readFileSync } from "fs";
import { Command, generateCommandsFromLine, numberCommandFactory, symbolCommandFactory } from './CommandGenerator';
import { flatMapEntries, generateEntries, splitLines } from '../../utils/fileProcessing';
import { CommandMapResult, handleMapCommand, handleMapCommandFactory } from './MapCommandHandler';
import { Map } from './Map';
import { handleCommands } from '../../utils/handleCommands';
import { CommandGearResult, handleGearCommand, handleGearCommandFactory } from './GearCommandHandler';
import { FakeMap } from './part1.test';
import { getTotalGear } from './getTotalGear';

const example = '2023/days/3/example.txt';
const content = readFileSync(example).toString();

describe('[Day 3] part 2', () => {
  describe('Handle a map command', () => {
    test('Numbers are added ', () => {
      const command = numberCommandFactory('123', 5, 8);
      let setNumber = '';
      const map = new FakeMap();
      const result = handleMapCommand([], command, map);
      expect((result.map as FakeMap).getNumberPosition()).toBe('5-8-123');
    });
  })

  describe('Handle a gear command', () => {
    test('Numbers are ignored', () => {
      const command = numberCommandFactory('123', 5, 8);
      const map = new Map();
      const result = handleGearCommand([], command, map);
      expect(result.isGear).toBeFalsy();
    });
    test('Non * symbols are ignored', () => {
      const command = symbolCommandFactory('+', 5, 8);
      const map = new Map();
      const result = handleGearCommand([], command, map);
      expect(result.isGear).toBeFalsy();
    });
    test('* symbols without 2 numbers next to it are ignored', () => {
      const command = symbolCommandFactory('*', 5, 8);
      const map = new Map();
      const result = handleGearCommand([], command, map);
      expect(result.isGear).toBeFalsy();
    });
    test('* symbols with 2 numbers next to it are gears', () => {
      const command = symbolCommandFactory('*', 5, 8);
      const map = new Map();
      map.setNumberPosition(2, 4, 8, 123);
      map.setNumberPosition(6, 8, 8, 456);
      const result = handleGearCommand([], command, map);
      expect(result.isGear).toBeTruthy();
    });
    test('Gears have their ratio calculated', () => {
      const command = symbolCommandFactory('*', 5, 8);
      const map = new Map();
      map.setNumberPosition(2, 4, 8, 3);
      map.setNumberPosition(6, 8, 8, 5);
      const result = handleGearCommand([], command, map);
      expect(result.value).toBe(15);
    });
  });

  test('Calculate total gears from example', () => {
    const lines = splitLines(content);
    const nestedCommands = generateEntries(lines, generateCommandsFromLine);
    const commands = flatMapEntries(nestedCommands);
    const map = new Map();
    handleCommands<Command, CommandMapResult>(commands, handleMapCommandFactory(map));
    const results = handleCommands<Command, CommandGearResult>(commands, handleGearCommandFactory(map));
    const total = getTotalGear(results);
    expect(total).toEqual(467835);
  });

  describe('Check some inputs', () => {
    const testWithStringArray = (
      lines: string[],
      expected: number,
    ) => {
      const nestedCommands = generateEntries(lines, generateCommandsFromLine);
      const commands = flatMapEntries(nestedCommands);
      const map = new Map();
      handleCommands<Command, CommandMapResult>(commands, handleMapCommandFactory(map));
      const results = handleCommands<Command, CommandGearResult>(commands, handleGearCommandFactory(map));
      const total = getTotalGear(results);
      expect(total).toEqual(expected);
    };

    test('2 inputs on a line', () => {
      const lines = [
        '5*4',
      ];
      testWithStringArray(lines, 20);
    })

    test('2 inputs on top of each other', () => {
      const lines = [
        '4',
        '*',
        '5',
      ];
      testWithStringArray(lines, 20);
    })

    test('2 inputs on top', () => {
      const lines = [
        '5.4',
        '.*.',
      ];
      testWithStringArray(lines, 20);
    })

    test('2 inputs on bottom', () => {
      const lines = [
        '.*.',
        '5.4',
      ];
      testWithStringArray(lines, 20);
    })

    test('2 inputs diagonal, top left to bottom right', () => {
      const lines = [
        '5..',
        '.*.',
        '..4',
      ];
      testWithStringArray(lines, 20);
    })

    test('2 inputs diagonal, top right to bottom left', () => {
      const lines = [
        '..5',
        '.*.',
        '4..',
      ];
      testWithStringArray(lines, 20);
    })

    test('multiple gears', () => {
      const lines = [
        '..5.5..',
        '.*...*.',
        '4.....4',
      ];
      testWithStringArray(lines, 40);
    })

    test('ignores non gears', () => {
      const lines = [
        '3...5..',
        '.*.4+*.',
        '..#4...',
      ];
      testWithStringArray(lines, 0);
    })

    test('Reddit hint 1', () => {
      const lines = [
        '........',
        '.24..4..',
        '......*.',
      ];
      // No luck
      testWithStringArray(lines, 0);
    })

    test('Reddit hint 2', () => {
      const lines = [
        '12.......*..',
        '+.........34',
        '.......-12..',
        '..78........',
        '..*....60...',
        '78..........',
        '.......23...',
        '....90*12...',
        '............',
        '2.2......12.',
        '.*.........*',
        '1.1.......56',
      ];
      // No luck
      testWithStringArray(lines, 6756);
    })

    test('Reddit hint 3', () => {
      const lines = [
        '.......5......',
        '..7*..*.......',
        '...*13*.......',
        '.......15.....',
      ];
      // No luck
      testWithStringArray(lines, 442);
    })

    test('Reddit hint 4', () => {
      const lines = [
        '503+',
      ];
      // No luck
      testWithStringArray(lines, 0);
    })

    test('Edge cases', () => {
      const lines = [
        '333.3', // Bingo!
        '...*.',
      ];
      const nestedCommands = generateEntries(lines, generateCommandsFromLine);
      const commands = flatMapEntries(nestedCommands);
      const map = new Map();
      handleCommands<Command, CommandMapResult>(commands, handleMapCommandFactory(map));
      const results = handleCommands<Command, CommandGearResult>(commands, handleGearCommandFactory(map));
      const total = getTotalGear(results);
      expect(total).toEqual(999);
    })
  });


  
})
