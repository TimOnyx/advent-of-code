// read file
import { generateEntries, readFile, splitLines } from '../util/fileProcessing';

interface Score {
  choiceScore: number;
  resultScore: number;
  totalAnswer1: number;
  totalAnswer2: number;
};

const options = {
  Rock: 'Rock',
  Paper: 'Paper',
  Scissors: 'Scissors'
};

const results = {
  loss: 'loss',
  draw: 'draw',
  won: 'won'
};

const opponentOptions: Record<string, string> = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors'
};

const myOptions: Record<string, string> = {
  Y: 'Paper',
  X: 'Rock',
  Z: 'Scissors'
};

const myResultOptions: Record<string, string> = {
  Y: results.draw,
  X: results.loss,
  Z: results.won,
};

const valuesForOptions: Record<string, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
};

const valueForResult: Record<string, number> = {
  loss: 0,
  draw: 3,
  won: 6,
};

const getResult = (entry: Entry) => {
  const { myBadChoice: myChoice, opponentsChoice } = entry;
  if (myChoice === opponentsChoice) {
    return results.draw;
  }
  if (myChoice === options.Paper && opponentsChoice === options.Rock) {
    return results.won;
  }
  if (myChoice === options.Rock && opponentsChoice === options.Scissors) {
    return results.won;
  }
  if (myChoice === options.Scissors && opponentsChoice === options.Paper) {
    return results.won;
  }

  return results.loss;
}

const getOptimalChoice = (entry: Entry) => {
  const { opponentsChoice, optimalResult } = entry;
  if (optimalResult === results.draw) {
    return opponentsChoice;
  }

  if (opponentsChoice === options.Paper) {
    if (optimalResult === results.loss) {
      return options.Rock;
    }
    if (optimalResult === results.won) {
      return options.Scissors;
    }
  }

  if (opponentsChoice === options.Rock) {
    if (optimalResult === results.loss) {
      return options.Scissors;
    }
    if (optimalResult === results.won) {
      return options.Paper;
    }
  }

  // if (opponentsChoice === options.Scissors) {
  if (optimalResult === results.loss) {
    return options.Paper;
  }

  // if (optimalResult === results.won) {
  return options.Rock;

}

const getScoreForEntry = (entry: Entry): Score => {
  const result = getResult(entry);
  const choiceScore = valuesForOptions[entry.myBadChoice];
  const resultScore = valueForResult[result];

  const optimalChoice = getOptimalChoice(entry);
  const optimalChoiceResult = valuesForOptions[optimalChoice];
  const result2 = valueForResult[entry.optimalResult];
  return {
    choiceScore,
    resultScore,
    totalAnswer1: choiceScore + resultScore,
    totalAnswer2: result2 + optimalChoiceResult,
  };
};

const getScores = (entries: Entry[]): Score[] => {
  return entries.map(getScoreForEntry);
};

interface Entry {
  opponentsChoice: string;
  myBadChoice: string;
  optimalResult: string;
}

const generateEntryDay2 = (line: string): Entry => {
  const [opponent, mine] = line.split(' ');
  return {
    opponentsChoice: opponentOptions[opponent],
    myBadChoice: myOptions[mine],
    optimalResult: myResultOptions[mine],
  }
}

readFile('days/2/input.txt', (content: string) => {
  const lines = splitLines(content);
  const entries = generateEntries(lines, generateEntryDay2);
  // PT 1 answer
  const scores = getScores(entries);
  let totalScore = 0;
  let totalScoreP2 = 0;
  for (const score of scores) {
    totalScore += score.totalAnswer1;
    totalScoreP2 += score.totalAnswer2;
  }
  console.log("Anwser 1:", totalScore);
  console.log("Anwser 2:", totalScoreP2);

});