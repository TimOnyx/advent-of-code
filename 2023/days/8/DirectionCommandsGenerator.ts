import { splitLines } from '../../utils/fileProcessing';

export interface DirectionCommand {
  directions: string[];
}

export const generateDirectionCommand = (input: string): DirectionCommand => {
  const [directionString] = splitLines(input);
  return {
    directions: directionString.split('')
  };
};


const getNumbersFromLine = (timeString: string) => {
  return timeString
    .split(': ')[1]
    .replace(/ +(?= )/g, '')
    .split(' ')
    .map(Number)
    .filter(Boolean);
};

