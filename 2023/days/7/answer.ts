// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../../utils/fileProcessing';
import { Command, generateCommand } from './CommandGenerator';
import { CommandResult, handleCommand } from './CommandHandler';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';
import { sortResults } from './sortResults';
import { calculateBids } from './calculateBids';

const input = './input.txt';

const part1 = (results: CommandResult[]) => {
  const sorted = sortResults(results);
  const bids = calculateBids(sorted);
  const total = getTotal(bids);
  console.log({total});
};

const part2 = (results: CommandResult[]) => {
  const sorted = sortResults(results, 'altDescription');
  const bids = calculateBids(sorted);
  const total2 = getTotal(bids);
  console.log({total2});
};

export const answer = () => {
  const content = readFileSync(input).toString();
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  const results = handleCommands<Command, CommandResult>(commands, handleCommand);
  part1(results);
  part2(results);
};

answer();
