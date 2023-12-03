import { Command } from './CommandGenerator';
import { IMap } from './Map';

export interface CommandGearResult {
  isGear: boolean;
  value: number;
}

export const handleGearCommand = (
  resuls: CommandGearResult[], 
  command: Command,
  map: IMap,
): CommandGearResult => {
  if (command.type === 'number') {
    return {
      isGear: false,
      value: 0,
    };
  }

  if (command.value !== '*') {
    return {
      isGear: false,
      value: 0,
    };
  }

  const gearValues = map.isGear(command.xPos, command.yPos);

  if (gearValues === false) {
    return {
      isGear: false,
      value: 0,
    };
  }

  return {
    isGear: true,
    value: gearValues[0] * gearValues[1],
  };
};

export const handleGearCommandFactory = (map: IMap) => (
  resuls: CommandGearResult[], 
  command: Command,
): CommandGearResult => handleGearCommand(resuls, command, map);
