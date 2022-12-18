// read file
import { readFileSync } from 'fs';

const file = 'days/6/input.txt';

const examples = [
  // V is 14th distinct character
  { answer1: 7,  answer2: 19, signal: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'}, 
  { answer1: 5,  answer2: 23, signal: 'bvwbjplbgvbhsrlpgdmjqwftvncz'},
  { answer1: 6,  answer2: 23, signal: 'nppdvjthqldpwncqszvftbrmjlhg'},
  { answer1: 10, answer2: 29, signal: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'},
  { answer1: 11, answer2: 26, signal: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'},
];

const findSignalIndex = (input: string, length: number = 4) => {
  const characters = input.split("");
  let answer = -1;
  for (let i = 0; i < characters.length - (length-1); i++) {
    const subset = characters.slice(i, i + length);
    const uniqueMap = subset.reduce((map, character) => {
      return {
        ...map,
        [character]: true
      }
    }, {} as Record<string, boolean>);
    // console.log(Object.keys(uniqueMap).length);
    if (Object.keys(uniqueMap).length === length) {
      answer = i + length;
      return answer;
    }
  }
  return answer;
}

const findMessageMarker = (input: string, length: number = 14) => {
  const uniqueMap: Record<string, boolean> = {};
  const characters = input.split("");
  let answer = 0;
  for (const character of characters) {
    answer ++;
    uniqueMap[character] = true;
    // console.log(Object.keys(uniqueMap).length, Object.keys(uniqueMap).length === length);
    if (Object.keys(uniqueMap).length === length) {
      break;
    }
  }
  // console.log(uniqueMap);
  return answer;
};

const init = () => {
  for (const example of examples) {
    const signalCalculated = findSignalIndex(example.signal, 4);
    const signalCalculated2 = findSignalIndex(example.signal, 14);
    console.log('----');
    console.log("A", signalCalculated, signalCalculated === example.answer1)
    console.log("B", signalCalculated2, signalCalculated2 === example.answer2)
  }

  const input = readFileSync(file).toString();
  // console.log("Answer 1:", findSignalIndex(input));
  console.log("Answer 2A:", findSignalIndex(input, 14));
  // console.log("Answer 2B:", findMessageMarker(input, 14));
  // 223 is too low
};

init();
