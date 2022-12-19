// read file
import { readFileSync } from 'fs';
import { generateEntries, splitLines } from '../util/fileProcessing';

const file = 'days/8/input.txt';

const generateRow = (line: string): Row => {
  return line.split('').map(a => Number(a));
};

type Tree = number;
type Row = Tree[];
type Map = Row[];

const isTreeOutside = (map: Map, x: number, y: number): boolean => {
  if (x === 0 || y === 0) {
    return true;
  }

  if (y === map.length - 1) {
    return true;
  }

  const row = map[y];
  if (x === row.length - 1) {
    return true;
  }

  return false;
}

const isTreeVisibleInSlice = (slice: number[], current: number): boolean => {
  const currentHeight = slice[current];
  const visible = {
    left: true,
    right: true
  };

  let visibleKey: keyof typeof visible = 'left';
  for (let index = 0; index < slice.length; index++) {
    if (index === current) {
      visibleKey = 'right'
      continue;
    }

    const tree = slice[index];
    if (tree < currentHeight) {
      continue;
    }
    
    visible[visibleKey] = false;
    if (index < current -1) {
      index = current -1;
    }
  }

  return visible.left || visible.right;
}

const isTreeVisibleVertical = (map: Map, x: number, y: number): boolean => {
  const slice = map.map(row => row[x]);
  return isTreeVisibleInSlice(slice, y);
}

const isTreeVisibleHorizontal = (map: Map, x: number, y: number): boolean => {
  const slice = map[y];
  return isTreeVisibleInSlice(slice, x);
}

const isTreeVisible = (map: Map, x: number, y: number): boolean => {
  const isOutside = isTreeOutside(map, x, y);
  if (isOutside) {
    return true;
  }

  const isVisibleVertical = isTreeVisibleVertical(map, y, x);
  if (isVisibleVertical) {
    return true;
  }

  const isVisibleHorizontal = isTreeVisibleHorizontal(map, y, x);
  if (isVisibleHorizontal) {
    return true;
  }

  return false;
};

const calculateViewScoreForDirection = (slice: number[]): number => {
  const [current, ...others] = slice;

  let score = 0;
  for (const height of others) {
    score ++;
    if (height >= current) {
      break;
    }
  }
  return score;
};

const calculateViewScore = (map: Map, x: number, y: number): number => {
  const row = map[y];
  const column = map.map(row => row[x]);

  const scoreLeft = calculateViewScoreForDirection(row.slice(0, x+1).reverse());
  const scoreTop = calculateViewScoreForDirection(column.slice(0, y+1).reverse());
  const scoreRight = calculateViewScoreForDirection(row.slice(x));
  const scoreBottom = calculateViewScoreForDirection(column.slice(y));

  return scoreLeft * scoreTop * scoreRight * scoreBottom;
};

const init = () => {
  const content = readFileSync(file).toString();
  const lines = splitLines(content);
  const map: Map = generateEntries(lines, generateRow);

  let visibleTrees = 0;
  let highestScore = -1;

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const visible = isTreeVisible(map, x, y);
      if (visible) {
        visibleTrees ++;
      }

      if (!isTreeOutside(map, x, y)) {
        const viewScore = calculateViewScore(map, x, y);
        if (viewScore > highestScore) {
          highestScore = viewScore;
        }
      }
    }
  }
  
  console.log("Anwser 1:", visibleTrees);
  console.log("Anwser 2:", highestScore);
};

init();
