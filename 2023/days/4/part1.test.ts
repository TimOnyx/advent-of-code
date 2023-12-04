import { readFileSync } from "fs";

const example = '2023/days/4/example.txt';
const content = readFileSync(example).toString();

describe('[Day 4] part 1', () => {

  test('Reads example file', () => {
    expect(content).toBeDefined();    
  });

  describe('Generates commands from a line', () => {
    test('Capture the winning numbers', () => {
      
    });

    test('Captures your numbers', () => {
      
    });
  })

  describe('Handle a command', () => {
    test('Winning numbers are counted', () => {
      
    });
    test('Points are calculated', () => {
      
    });
  })

  test('Calculate total from example', () => {
    
  });
})
