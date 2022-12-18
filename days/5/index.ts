// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../util/fileProcessing';

const file = 'days/5/input.txt';

interface Container {
  code: string;
}

type Stack = Container[];

interface Instruction {
  amount: number;
  from: number;
  to: number;
}

const lineHasContainers = (line: string) => {
  return line.includes('[');
}

interface ContainerPosition {
  positionFromTop: number;
  stack: number;
  code: string;
}

const containerDrawingToCode = (container: string): string => {
  return container.replace(/ /g, "").replace("[", "").replace("]", "");
}

const getContainersFromLine = (line: string, positionFromTop: number): ContainerPosition[] => {
  const containers: ContainerPosition[] = [];
  for (let i = 0; i < line.length; i+=4) {
    const partial = line.substring(i, i + 4);
    if (!lineHasContainers(partial)) {
      continue;
    }

    const code = containerDrawingToCode(partial);
    const stack = i / 4;
    containers.push({
      code,
      stack,
      positionFromTop,
    });
  }
  
  return containers;
}

const generateStacksWithContainers = (count: number, containers: ContainerPosition[]): Stack[] => {
  const stacks: Stack[] = [];
  for (let i = 0; i < count; i++) {
    stacks[i] = [];
  }

  for (const container of containers) {
    const { code, positionFromTop } = container;
    const stack = stacks[container.stack];
    stack[positionFromTop] = { code }
  }

  return stacks.map(stack => stack.reverse().filter(a => a));
};

const generateInitialState = (lines: string[]): Stack[] => {
  const containers: ContainerPosition[] = [];
  let stackCount = 0;
  lines.forEach((line, i) => {
    if (!lineHasContainers(line)) {
      stackCount = line.split("   ").length;
      return;
    }

    containers.push(...getContainersFromLine(line, i));
  });
  const stacks = generateStacksWithContainers(stackCount, containers);
  return stacks;
};

const generateInstructions = (line: string): Instruction => {
  const withoutPrefix = line.replace('move ', '');
  const [amountString, positions] = withoutPrefix.split(' from ');
  const [fromString, toString] = positions.split(' to ');

  return {
    amount: Number(amountString),
    from: Number(fromString) - 1,
    to: Number(toString) - 1
  };
};

const applyInstructionToStacks = (stacks: Stack[], instruction: Instruction, multipleAtOnce: boolean) => {
  const { amount, from, to } = instruction;

  // Answer part 1
  if (!multipleAtOnce) {
    for (let i = 0; i < amount; i++) {
      const container = stacks[from].pop();
      if (!container) {
        continue;
      }
      stacks[to].push(container);
    }
    return stacks
  }

  // Anwser part 2
  const containers = stacks[from].splice(stacks[from].length - amount);
  stacks[to].push(...containers);

  return stacks;
}

const applyInstructionsToStacks = (
  stacks: Stack[], 
  instructions: Instruction[], 
  multipleAtOnce: boolean
): Stack[] => {
  let newStacks = JSON.parse(JSON.stringify(stacks));
  for (const instruction of instructions) {
    newStacks = applyInstructionToStacks(stacks, instruction, multipleAtOnce);
  }

  return newStacks;
};

const getTopContainer = (stack: Stack): string => {
  return stack[stack.length-1].code;
}

const init = () => {
  const content = readFileSync(file).toString();
  const [initialContent, instructionContent] = content.split("\n\n");
  const initialLines = splitLines(initialContent);
  const stacks = generateInitialState(initialLines);

  const instructionLines = splitLines(instructionContent);
  const instructions: Instruction[] = generateEntries(instructionLines, generateInstructions);

  // Set true to false for answer part 1
  const newStacks = applyInstructionsToStacks(stacks, instructions, true);
  const codes = newStacks.map(getTopContainer)
  console.log(codes);
  console.log("Anwser 1:", codes.join(''));

  // console.log("Anwser 2:", partialOverlappingEntries.length);
};

init();
