// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from './fileProcessing';

const file = 'days/x/input.txt';

interface Command1 {
  
}

interface Command2 {
  
}

export type Command = Command1 | Command2;

export const generateCommand = (line: string): Command => {
  const [] = line.split(' ');

  return {

  };
};

export interface CommandResult {
}

export const runCommand = (resuls: CommandResult[], command: Command) => {
  return 0;
};

export const runCommands = (commands: Command[]) => {
  let results: CommandResult[] = [];
  for (const command of commands) {
    results.push(runCommand(results, command));
  }
  return results;
}

export const answer1 = () => {
  const content = readFileSync(file).toString();
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  runCommands(commands);
};

