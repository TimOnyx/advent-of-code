export interface Command {
  values: number[];
}

export const generateCommand = (line: string): Command => {
  // 0 3 6 9 12 15
  let commandString = line;

  // 0
  const values = commandString.split(' ').map(Number);

  return {
    values
  };
};
