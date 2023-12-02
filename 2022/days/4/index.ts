// read file
import { generateEntries, readFile, splitLines } from '../util/fileProcessing';

interface Assignment {
  start: number,
  end: number,
}

interface Entry {
  elf1: Assignment;
  elf2: Assignment;
}

const generateAssignment = (input: string): Assignment => {
  const [start, end] = input.split('-');
  return { 
    start: Number(start),
    end: Number(end),
  };
};

const generateEntryDay4 = (line: string): Entry => {
  const [first, second] = line.split(',');

  return {
    elf1: generateAssignment(first),
    elf2: generateAssignment(second),
  };
};

const aIsContainedInB = (a: Assignment, b: Assignment): boolean => {
  const { start: start1, end: end1 } = a;
  const { start: start2, end: end2 } = b;

  // start 2 < start 1 < end 1 < end 2
  if (start2 <= start1 && start1 <= end1 && end1 <= end2 ) {
    return true
  }

  return false;
}

const isFullOverlap = (entry: Entry): boolean => {
  const {elf1, elf2} = entry;

  if (aIsContainedInB(elf1, elf2)) {
    return true;
  }

  if (aIsContainedInB(elf2, elf1)) {
    return true;
  }
  
  return false;
}



const aOverlapsB = (a: Assignment, b: Assignment): boolean => {
  const { start: start1, end: end1 } = a;
  const { start: start2, end: end2 } = b;

  if (start1 <= start2 && start2 <=  end1) {
    return true;
  }

  return false;
}

const isPartialOverlap = (entry: Entry): boolean => {
  const {elf1, elf2} = entry;

  if (aOverlapsB(elf1, elf2)) {
    return true;
  }
  if (aOverlapsB(elf2, elf1)) {
    return true;
  }
  
  return false;
}

readFile('days/4/input.txt', (content: string) => {
  const lines = splitLines(content);
  const entries = generateEntries(lines, generateEntryDay4);
  const overlappingEntries = entries.filter(isFullOverlap);
  console.log("Anwser 1:", overlappingEntries.length);

  const partialOverlappingEntries = entries.filter(isPartialOverlap);
  console.log("Anwser 2:", partialOverlappingEntries.length);
  // 515 is too low
  // 798 is too low

});