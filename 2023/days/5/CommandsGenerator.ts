import { splitLines } from '../../utils/fileProcessing';
import { MapCommand, generateMapCommand } from './MapCommandGenerator';
import { SeedCommand, generateSeedCommand } from './SeedCommandGenerator';

export interface CommandGroup {
  seedsCommand: SeedCommand;
  mapCommands: MapCommand[];
}

export const generateCommands = (lines: string): CommandGroup => {
  let [descriptionLine, ...rangeLines] = splitLines(lines);

  const seedsCommand = generateSeedCommand(descriptionLine);
  
  const mapCommands: MapCommand[] = [];
  let group: string[] = [];
  rangeLines.forEach(element => {
    if (element !== '') {
      group.push(element);
      return;
    }

    if (group.length) {
      mapCommands.push(generateMapCommand(group));
      group = [];
    }
  });

  if (group.length) {
    mapCommands.push(generateMapCommand(group));
  }

  return {
    seedsCommand,
    mapCommands,
  };
};
