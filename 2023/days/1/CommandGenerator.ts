export interface Command {
  firstDigit: number;
  lastDigit: number;
}

const characterIsDigit = (character: string): boolean => {
  return !isNaN(Number(character));
};

export const generateCommand = (line: string): Command => {
  let restLine = line;
  let filtering = true;
  const digits: number[] = [];

  function checkForNumberAsWord(word: string, value: number) {
    if (restLine.startsWith(word)) {
      digits.push(value);
    }
  }

  while (filtering) {

    // Part 2
    checkForNumberAsWord('one', 1);
    checkForNumberAsWord('two', 2);
    checkForNumberAsWord('three', 3);
    checkForNumberAsWord('four', 4);
    checkForNumberAsWord('five', 5);
    checkForNumberAsWord('six', 6);
    checkForNumberAsWord('seven', 7);
    checkForNumberAsWord('eight', 8);
    checkForNumberAsWord('nine', 9);
    // End part 2
    
    const firstCharacter = restLine[0];
    if (characterIsDigit(firstCharacter)) {
      digits.push(Number(firstCharacter));
    }
    restLine = restLine.slice(1);
    filtering = Boolean(restLine.length);
  }

  return {
    firstDigit: digits[0],
    lastDigit: digits[digits.length - 1],
  };
};
