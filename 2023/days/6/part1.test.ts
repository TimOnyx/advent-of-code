import { readFileSync } from "fs";
import { generateCommand } from './CommandsGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { getTotal } from './getTotal';

const day = 6;
const example = `2023/days/${day}/example.txt`;
const content = readFileSync(example).toString();

describe(`[Day ${day}] part 1`, () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });

  describe('Generates commands from text', () => {
    const commands = generateCommand(content);
    test('Capture the seeds', () => {
      expect(commands.races).toEqual([
        {
          time: 7,
          distance: 9
        },
        {
          time: 15,
          distance: 40
        },
        {
          time: 30,
          distance: 200
        },
      ]);
    });
  })

  describe('Handle a command', () => {
    const command = generateCommand(content);
    const result = handleCommand([], command);
    test('result has from and to', () => {
      expect(result.races[0].options).toBe(4);
      expect(result.races[1].options).toBe(8);
      expect(result.races[2].options).toBe(9);
    });
  })

  test('Calculate result', () => {
    const result: CommandResult = {
      races: [
        {
          options: 4
        },
        {
          options: 8
        },
        {
          options: 9
        },
      ]
    };
    const lowest = getTotal(result);
    expect(lowest).toEqual(288);
  });
})
