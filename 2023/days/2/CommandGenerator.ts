export interface Round {
  red: number;
  green: number;
  blue: number;
}

export interface Command {
  id: number;
  rounds: Round[];
  minimumGems: Round;
}

export const generateCommand = (line: string): Command => {
  // 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  let commandString = line;

  // idAsString = 'Game 1'
  // rest = '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  const [idAsString, rest] = commandString.split(': ');

  // 3
  const idAsNumber = Number(idAsString.replace('Game ', ''));
  const roundStrings = rest.split('; ');

  // Part 2
  const minimumGems = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const rounds = roundStrings.map((roundString) => {
    // 3 blue, 4 red
    type Color = 'red' | 'green' | 'blue';
    const gems = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const colorStrings = roundString.split(', ');
    colorStrings.forEach((colorString) => {
      // 3 blue
      const [countAsString, color] = colorString.split(' ');
      const count = Number(countAsString);
      gems[color as Color] = count;

      // Part 2
      if(count > minimumGems[color as Color]) {
        minimumGems[color as Color] = count;
      }
    });

    return gems
  });
  return {
    id: idAsNumber,
    rounds,
    minimumGems,
  };
};
