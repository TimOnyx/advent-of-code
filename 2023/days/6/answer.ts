// read file
import { readFileSync } from 'fs';
import { handleCommands } from '../../utils/handleCommands';
import { generateCommand } from './CommandsGenerator';
import { handleCommand } from './CommandHandler';
import { getTotal } from './getTotal';

const input = './input.txt';
const input2 = './input2.txt';

export const answer = (input: string) => {
  const content = readFileSync(input).toString();
  const commands = generateCommand(content);
  const results = handleCommand([], commands);
  const total = getTotal(results);
  console.log({total});
};

answer(input);
answer(input2);
