// read file
import { readFileSync } from 'fs';
import { flatMapEntries, generateEntries, splitLines } from '../../utils/fileProcessing';
import { Command, generateCommandsFromLine } from './CommandGenerator';
import { handleCommands } from '../../utils/handleCommands';
import { getTotal } from './getTotal';
import { CommandMapResult, handleMapCommandFactory } from './MapCommandHandler';
import { CommandPartResult, handlePartCommandFactory } from './PartCommandHandler';
import { Map } from './Map';
import { CommandGearResult, handleGearCommandFactory } from './GearCommandHandler';
import { getTotalGear } from './getTotalGear';

const input = './input.txt';

export const answer = () => {
  const content = readFileSync(input).toString();
  const lines = splitLines(content);
  const nestedCommands = generateEntries(lines, generateCommandsFromLine);
  const commands = flatMapEntries(nestedCommands);
  const map = new Map();
  handleCommands<Command, CommandMapResult>(commands, handleMapCommandFactory(map));
  const results = handleCommands<Command, CommandPartResult>(commands, handlePartCommandFactory(map));
  const total = getTotal(results);
  console.log({total});
  const gearResults = handleCommands<Command, CommandGearResult>(commands, handleGearCommandFactory(map));
  const totalGear = getTotalGear(gearResults);
  console.log({totalGear});
};

answer();