import { Command } from './CommandGenerator';
import { IMap } from './Map';

export interface CommandPartResult {
  isPart: boolean;
  value: number;
}

export const handlePartCommand = (
  resuls: CommandPartResult[], 
  command: Command,
  map: IMap,
): CommandPartResult => {
  if (command.type === 'symbol') {
    return {
      isPart: false,
      value: 0,
    };
  }

  return {
    isPart: map.isPart(command.xPos, command.xPosEnd, command.yPos),
    value: command.value,
  };
};

export const handlePartCommandFactory = (map: IMap) => (
  resuls: CommandPartResult[], 
  command: Command,
): CommandPartResult => handlePartCommand(resuls, command, map);
