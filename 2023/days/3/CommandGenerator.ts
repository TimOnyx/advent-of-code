export interface SymbolCommand {
  value: string;
  type: 'symbol';
  xPos: number;
  yPos: number;
}

export interface NumberCommand {
  value: number;
  type: 'number';
  xPos: number;
  xPosEnd: number;
  yPos: number;
}

export type Command = SymbolCommand | NumberCommand;

const characterIsDigit = (character: string): boolean => {
  return !isNaN(Number(character));
}

export const symbolCommandFactory = (
  value: string, 
  xPos: number, 
  yPos: number
): SymbolCommand => ({
  value,
  type: 'symbol',
  xPos,
  yPos,
});

export const numberCommandFactory = (
  value: string, 
  xPos: number, 
  yPos: number
): NumberCommand => ({
  value: Number(value),
  type: 'number',
  xPos,
  xPosEnd: xPos + value.length - 1,
  yPos,
});

export const generateCommandsFromLine = (line: string, lineIndex: number): Command[] => {
  // .....+.58.
  let restLine = line;
  let filtering = true;
  const commands: Command[] = [];
  let xPos = 0;

  while (filtering) {
    const firstCharacter = restLine[0];
    let sliceLength = 1;

    if (firstCharacter !== '.') {
      if (characterIsDigit(firstCharacter)) {
        const restOfNumber = restLine.match(/\d+/)?.[0];
        commands.push(
          numberCommandFactory(restOfNumber!, xPos, lineIndex)
        );
        sliceLength = restOfNumber!.length;
      } else {
        commands.push(
          symbolCommandFactory(firstCharacter, xPos, lineIndex)
        );
      }
    }
    xPos += sliceLength;
    restLine = restLine.slice(sliceLength);
    filtering = Boolean(restLine.length);
  }


  return commands;
};
