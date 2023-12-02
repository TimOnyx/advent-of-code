// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';
import { getTotalPower } from './getTotalPower';

const input = './input.txt';

export const answer = () => {
  const content = readFileSync(input).toString();
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  const results = handleCommands<Command, CommandResult>(commands, handleCommand);
  const total = getTotal(results);
  console.log({total});
  const totalPower = getTotalPower(results);
  console.log({totalPower});
};

answer();