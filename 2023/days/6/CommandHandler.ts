import { Command } from './CommandsGenerator';

interface Race {
  options: number;
}

export interface CommandResult {
  races: Race[];
}

const calculateSpeed = (time: number): number => {
  return time;
};

export const handleCommand = (
  results: CommandResult[], command: Command
): CommandResult => {

  let longestDuraction = 0;
  let shortestDistance = -1;
  for (const race of command.races) {
    if (shortestDistance === -1) {
      shortestDistance = race.distance;
    }
    if(race.time > longestDuraction) {
      longestDuraction = race.time;
    }
    if (race.distance < shortestDistance) {
      shortestDistance = race.distance;
    }
  }

  const speedMap: Record<number, number> = {};

  for (let i = 0; i <= longestDuraction; i++) {
    const speed = calculateSpeed(i);
    speedMap[i] = speed;
  }

  const races: Race[] = [];

  for (const race of command.races) {
    let count = 0;
    for (let i = 0; i <= race.time; i++) {
      const speed = speedMap[i];
      const timeLeftToRace = race.time - i;
      const distance = speed * timeLeftToRace;
      if (distance > race.distance) {
        count ++;
      }
    }
    races.push({
      options: count,
    })
  }

  return {
    races
  };
};
