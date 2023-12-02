import { Command } from './CommandGenerator';


export interface CommandResult {
  total: number;
}

export const handleCommand = (
  resuls: CommandResult[], command: Command
): CommandResult => {
  const totalAsString = `${command.firstDigit}${command.lastDigit}`;
  const totalAsNumber = Number(totalAsString);
  return { total: totalAsNumber};
};
