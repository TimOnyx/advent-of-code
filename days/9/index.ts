// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../util/fileProcessing';

const file = 'days/9/input.txt';

interface Command {
  direction: 'vertical' | 'horizontal';
  value: number;
}

const generateCommand = (line: string): Command => {
  const [direction, value] = line.split(' ');

  const posNeg = (direction === 'D' || direction === 'L')
    ? -1
    : 1

  return {
    direction: (direction === 'U' || direction === 'D')
      ? 'vertical' 
      : 'horizontal',
    value: Number(value) * posNeg,
  }
};

interface Coordinate {
  x: number;
  y: number;
}

type VisitedMap = Record<string, boolean>;

const registerNewVisit = (coordinate: Coordinate, map: VisitedMap): boolean => {
  const { x, y } = coordinate
  const alreadyVisited = map[`${x}:${y}`];
  map[`${x}:${y}`] = true;
  return !alreadyVisited;
};

const tailMovement = (hPos: Coordinate, tPos: Coordinate) => {
  const verticalDistance = hPos.y - tPos.y;
  const horizontalDistance = hPos.x - tPos.x;

  const totalDistance = Math.abs(verticalDistance) + Math.abs(horizontalDistance);
  if (totalDistance > 2) {
    // move diagonal
    const posNegVertical = verticalDistance > 0
      ? 1 
      : -1;

    const posNegHorizontal = horizontalDistance > 0 
      ? 1 
      : -1;

    tPos.x += 1 * posNegHorizontal;
    tPos.y += 1 * posNegVertical;
    return;
  }

  if (Math.abs(verticalDistance) > 1) {
    const posNeg = verticalDistance > 0
      ? 1 
      : -1;

    tPos.y += 1 * posNeg;
    return;
  }
  
  if (Math.abs(horizontalDistance) > 1) {
    const posNeg = horizontalDistance > 0 
      ? 1 
      : -1;

    tPos.x += 1 * posNeg;
    return;
  }
}

const enableLog = false;
const logPositions = (positions: Coordinate[]) => {
  if (!enableLog) {
    return;
  }

  const [first, ...rest] = positions;
  console.log(' ');
  console.log(`--- H: ${first.x} : ${first.y}`);
  rest.forEach((pos, index) => {
    if (index === rest.length - 1) {
      console.log(`--- T: ${pos.x} : ${pos.y}`);
      return;
    }
    console.log(`--- ${index}: ${pos.x} : ${pos.y}`);
  })
}

const executeCommand = (positions: Coordinate[], command: Command, map: VisitedMap) => {
  const { direction, value } = command;
  const directionKey = direction === 'horizontal' ? 'x' : 'y';

  const posNeg = value > 0
    ? 1
    : -1

  for (let i = 0; i < Math.abs(value); i ++) {
    positions[0][directionKey] += posNeg;
    for (let j = 1; j < positions.length; j++) {
      tailMovement(positions[j-1], positions[j]);
    }
    registerNewVisit(positions[positions.length - 1], map)
    logPositions(positions);
  }
}

const init = () => {
  const content = readFileSync(file).toString();
  const lines = splitLines(content);
  const commands: Command[] = generateEntries(lines, generateCommand);

  // Answer 1
  // const base = Array(2).fill(null);
  // Answer 2
  const base = Array(10).fill(null);

  const positions: Coordinate[] = base.map(() => ({
    x: 0,
    y: 0,
  }));
  
  const visitedMap: VisitedMap = {};
  registerNewVisit(positions[positions.length - 1], visitedMap)
  for (const command of commands) {
    executeCommand(positions, command, visitedMap);
  }
  
  console.log("Answer:", Object.keys(visitedMap).length);
};

init();
