import { Command } from './CommandGenerator';
import { IMap } from './Map';

export interface CommandMapResult {
  map: IMap;
}

export const handleMapCommand = (
  resuls: CommandMapResult[], 
  command: Command,
  map: IMap,
): CommandMapResult => {

  if (command.type === 'number') {
    map.setNumberPosition(
      command.xPos, 
      command.xPosEnd, 
      command.yPos, 
      command.value
    );

    return { map };
  }

  map.setSymbolPosition(command.xPos, command.yPos);
  return { map };
};

export const handleMapCommandFactory = (map: IMap) => (
  resuls: CommandMapResult[], 
  command: Command,
): CommandMapResult => handleMapCommand(resuls, command, map);
