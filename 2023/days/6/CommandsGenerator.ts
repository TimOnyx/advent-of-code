import { splitLines } from '../../utils/fileProcessing';

interface Race {
  time: number;
  distance: number;
}

export interface Command {
  races: Race[];
}

export const generateCommand = (lines: string): Command => {
  const [timeString, distanceString] = splitLines(lines);
  const times = getNumbersFromLine(timeString);
  const distances = getNumbersFromLine(distanceString);
  const races: Race[] = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    races.push({
      time,
      distance,
    });
  }

  return {
    races,
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

