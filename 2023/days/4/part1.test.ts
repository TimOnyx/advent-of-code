import { readFileSync } from "fs";
import { Command, NumberCommand, generateCommandsFromLine, numberCommandFactory, symbolCommandFactory } from './CommandGenerator';
import { flatMapEntries, generateEntries, splitLines } from '../../utils/fileProcessing';
import { CommandMapResult, handleMapCommand, handleMapCommandFactory } from './MapCommandHandler';
import { IMap, Map } from './Map';
import { CommandPartResult, handlePartCommand, handlePartCommandFactory } from './PartCommandHandler';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';

const example = '2023/days/4/example.txt';
const content = readFileSync(example).toString();

describe('[Day 4] part 1', () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });

  describe('Generates commands from a line', () => {
    const commands = generateCommandsFromLine('.....+.58.', 0);

    test('Capture the type', () => {
      expect(commands[0].type).toBe('symbol');
      expect(commands[1].type).toBe('number');
    });

    test('Captures the value', () => {
      expect(commands[0].value).toBe('+');
      expect(commands[1].value).toBe(58);
    });

    test('Captures 2 commands', () => {
      expect(commands.length).toBe(2);
    });

    test('Captures positions', () => {
      expect(commands[0].xPos).toBe(5);
      expect(commands[0].yPos).toBe(0);
      expect(commands[1].xPos).toBe(7);
      expect(commands[1].yPos).toBe(0);
      expect((commands[1] as NumberCommand).xPosEnd).toBe(8);
    });
  })

  describe('Generates commands from a file', () => {
    const lines = splitLines(content);
    const nestedCommands = generateEntries(lines, generateCommandsFromLine);
    const commands = flatMapEntries(nestedCommands);

    test('Captures all commands', () => {
      expect(commands.length).toBe(16);
    });
  })

  describe('Handle a map command', () => {
    test('Symbols are added to the map', () => {
      const command = symbolCommandFactory('+', 5, 8);
      const map = new FakeMap();
      const result = handleMapCommand([], command, map);
      expect((result.map as FakeMap).getSymbolPosition()).toBe('5-8');
    });
    test('Numbers are ignored', () => {
      const command = numberCommandFactory('123', 5, 8);
      let setSymbol = '';
      const map = new FakeMap();
      const result = handleMapCommand([], command, map);
      expect((result.map as FakeMap).getSymbolPosition()).toBe('');
    });
  })

  describe('Handle a part command', () => {
    test('Numbers without a symbol near them are ignored', () => {
      const command = numberCommandFactory('123', 5, 8);
      const map = new Map();
      const result = handlePartCommand([], command, map);
      expect(result.isPart).toBeFalsy();
    });
    test('Symbols are ignored', () => {
      const command = symbolCommandFactory('+', 5, 8);
      const map = new Map();
      const result = handlePartCommand([], command, map);
      expect(result.isPart).toBeFalsy();
    });
    describe('Numbers with a symbol near them are parts', () => {
      const command = numberCommandFactory('123', 5, 8);

      test('Symbol on the left', () => {
        const map = new Map();
        map.setSymbolPosition(4, 8);
        const result = handlePartCommand([], command, map);
        expect(result.isPart).toBeTruthy();
      });

      test('Symbol on the right', () => {
        const map = new Map();
        map.setSymbolPosition(8, 8);
        const result = handlePartCommand([], command, map);
        expect(result.isPart).toBeTruthy();
      });

      test('Symbol on the top left', () => {
        const map = new Map();
        map.setSymbolPosition(4, 7);
        const result = handlePartCommand([], command, map);
        expect(result.isPart).toBeTruthy();
      });

      test('Symbol on the bottom right', () => {
        const map = new Map();
        map.setSymbolPosition(8, 9);
        const result = handlePartCommand([], command, map);
        expect(result.isPart).toBeTruthy();
      });
    });
  })

  test('Calculate total from example', () => {
    const lines = splitLines(content);
    const nestedCommands = generateEntries(lines, generateCommandsFromLine);
    const commands = flatMapEntries(nestedCommands);
    const map = new Map();
    handleCommands<Command, CommandMapResult>(commands, handleMapCommandFactory(map));
    const results = handleCommands<Command, CommandPartResult>(commands, handlePartCommandFactory(map));
    const total = getTotal(results);
    expect(total).toEqual(4361);
  });
})
