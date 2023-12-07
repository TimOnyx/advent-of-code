interface SeedRange {
  start: number;
  length: number;
}

export interface SeedCommand {
  seeds: number[];
  seedRanges: SeedRange[];
}

export const generateSeedCommand = (line: string): SeedCommand => {
  // seeds: 79 14 55 13
  let commandString = line;

  // seeds: 
  // 79 14 55 13
  const [name, seedString] = commandString.split(': ');
  const seeds = seedString.split(' ').map(Number);

  const seedRanges: SeedRange[] = [];
  for (let i = 0; i < seeds.length; i+=2) {
    const start = seeds[i];
    const length = seeds[i+1];
    seedRanges.push({
      start,
      length,
    });
  }

  return {
    seeds,
    seedRanges,
  };
};
