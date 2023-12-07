// read file
import { readFileSync } from 'fs';
import { handleCommands } from '../../utils/handleCommands';
import { generateCommands } from './CommandsGenerator';
import { MapCommandResult, handleMapCommand } from './MapCommandHandler';
import { generateMaps } from './generateMaps';
import { handleLocationCommand } from './LocationCommandHandler';
import { getLowest } from './getLowest';

const input = './input.txt';

export const answer = () => {
  const content = readFileSync(input).toString();
  const commands = generateCommands(content);
  const mapResults = handleCommands(commands.mapCommands, handleMapCommand);
  const maps: Record<string, MapCommandResult> = generateMaps(mapResults);
  const locationResults = handleCommands(
    commands.seedsCommand.seeds.map(seed => ({
      seed,
      maps,
    })), 
    handleLocationCommand,
  );

  const lowest = getLowest(locationResults);
  console.log({lowest});

  let lowestFromRange = -1;
  const ranges = commands.seedsCommand.seedRanges.length;

  for (let i = 0; i < commands.seedsCommand.seedRanges.length; i++) {
    if (i % 10 === 0) {
      console.log(`starting range ${i} ${ranges}`);
    }
    const range = commands.seedsCommand.seedRanges[i];
    const percentile = Math.floor(range.length / 100);
    for (let j = 0; j < range.length; j++) {
      if (j % percentile === 0) {
        console.log(`${Math.round(j/range.length*100)}% of range - ${j} ${range.length}`);
      }
      const seed = range.start + j;
      const result = handleLocationCommand([], {
        seed,
        maps,
      })

      if (lowestFromRange === -1) {
        lowestFromRange = result.location;
      }

      if (result.location < lowestFromRange) {
        lowestFromRange = result.location;
      }
    }
  }

  console.log({lowestFromRange});
};

answer();
