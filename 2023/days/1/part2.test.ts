import { readFileSync } from "fs";
import { generateCommand } from './CommandGenerator';

const example = '2023/days/1/example.txt';
const content = readFileSync(example).toString();

describe('[Day 1] part 2', () => {
  test('Generate a command from a line with written numbers', () => {
    const command = generateCommand('two1nine');
    expect(command).toEqual({
      firstDigit: 2,
      lastDigit: 9,
    });
  })
  test('Test for Lennert', () => {
    const command = generateCommand('two1eightwo');
    expect(command).toEqual({
      firstDigit: 2,
      lastDigit: 2,
    });
  })
})