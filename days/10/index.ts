// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../util/fileProcessing';

const file = 'days/10/input.txt';

interface NoopCommand {
  type: 'noop';
}

interface AddXCommand {
  type: 'addX';
  value: number;
}

export type Command = NoopCommand | AddXCommand;

export const generateCommand = (line: string): Command => {
  const [command, value] = line.split(' ');

  if (command === 'noop') {
    return {
      type: 'noop'
    };
  }

  return {
    type: 'addX',
    value: Number(value),
  };
};

export interface CycleState {
  startValue: number;
  endValue: number;
  count: number;
}

export const getLastCycle = (states: CycleState[]): CycleState => {
  if (!states.length) {
    return generateState();
  }

  return states[states.length - 1];
}

export const generateState = (previous?: CycleState, add: number = 0): CycleState => {
  if (!previous) {
    return {
      count: 0,
      startValue: 1,
      endValue: 1,
    }
  }

  return {
    count: previous.count + 1,
    startValue: previous.endValue,
    endValue: previous.endValue + add
  }
};

export const runCommand = (cycleStates: CycleState[], command: Command) => {
  
  if (command.type === 'noop') {
    const lastCycle = getLastCycle(cycleStates);
    cycleStates.push(generateState(lastCycle));
  }

  if (command.type === 'addX') {
    // if (!cycleStates.length) {
    //   // This looks weird to me, don't think this should be here
    //   // It's not part of my input however

    //   // start execution, if states is not empty, 
    //   // this is the "finish" of the previous command
    //   const lastCycle = getLastCycle(cycleStates);
    //   cycleStates.push(generateState(lastCycle));
    // }

    // takes some time
    let lastCycle = getLastCycle(cycleStates);
    const processCycle = generateState(lastCycle)
    cycleStates.push(processCycle);

    // finishes execution
    cycleStates.push(generateState(processCycle, command.value));
  }

  return cycleStates;
};

export const runCommands = (commands: Command[]) => {
  let cycleStates: CycleState[] = [];
  for (const command of commands) {
    cycleStates = runCommand(cycleStates, command);
  }
  return cycleStates;
}

export const getSignalStrength = (state: CycleState): number => {
  return state.count * state.startValue;
}

export const getSignalSum = (states: CycleState[]): number => {
  const signals = states.map(getSignalStrength);
  let total = 0;
  for (const signal of signals) {
    total += signal;
  }
  return total;
}

export const answer1 = () => {
  const content = readFileSync(file).toString();
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  const states = runCommands(commands);
  // console.log(states);
  const importantIndexes = [19, 59, 99, 139, 179, 219];
  const sum = getSignalSum(importantIndexes.map(i => states[i]));
  // 14360 is too high
  // 14350 is too high
  return sum;
};

export const shouldLightUp = (xPos: number, spritePos: number) => {
  if (Math.abs(spritePos - xPos) > 1) {
    return false;
  }

  return true;
}

export const renderLine = (cycles: CycleState[]) => {
  let line = "";
  for (let i = 0; i < cycles.length; i ++) {
    const cycle = cycles[i];
    if (shouldLightUp(i, cycle.startValue)) {
      line += "#";
    } else {
      line += " ";
    }
  }
  return line;
};

export const answer2 = () => {
  const content = readFileSync(file).toString();
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);
  const states = runCommands(commands);
  let output = '';
  output += renderLine(states.slice(0, 39));
  output += "\n";
  output += renderLine(states.slice(40, 79));
  output += "\n";
  output += renderLine(states.slice(80, 119));
  output += "\n";
  output += renderLine(states.slice(120, 159));
  output += "\n";
  output += renderLine(states.slice(160, 199));
  output += "\n";
  output += renderLine(states.slice(200, 239));

  return output;
};

const val = answer2();
console.log("Answer 2:")
console.log(val);