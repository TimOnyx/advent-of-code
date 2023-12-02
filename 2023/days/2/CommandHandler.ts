import { Command } from './CommandGenerator';


export interface CommandResult {
  id: number;
  possible: boolean;
  power: number;
}

export const handleCommand = (
  resuls: CommandResult[], command: Command
): CommandResult => {
  const availableGems = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let possible = true;
  for (const round of command.rounds) {
    if (round.red > availableGems.red) {
      possible = false;
      break;
    }
    if (round.green > availableGems.green) {
      possible = false;
      break;
    }
    if (round.blue > availableGems.blue) {
      possible = false;
      break;
    }
  }

  const power = command.minimumGems.red * command.minimumGems.green * command.minimumGems.blue;
  
  return { possible, id: command.id, power };
};
