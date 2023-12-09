import { splitLines } from '../../utils/fileProcessing';

interface Direction {
  L: string;
  R: string;
}

export interface OptionCommand {
  name: string;
  directions: Direction;
}

export const generateOptionCommands = (input: string): OptionCommand[] => {
  const [directionString, split, ...optionStrings] = splitLines(input);

  const commands: OptionCommand[] = [];
  for (const optionString of optionStrings) {
    const [name, options] = optionString.split(' = (');
    const [L, R] = options.replace(')', '').split(', ');
    commands.push({
      name,
      directions: {
        L,
        R,
      }
    });
  }

  return commands;
};


const getNumbersFromLine = (timeString: string) => {
  return timeString
    .split(': ')[1]
    .replace(/ +(?= )/g, '')
    .split(' ')
    .map(Number)
    .filter(Boolean);
};

