import { readFileSync } from 'fs';
import { 
  generateCommand,
  runCommand,
  getLastCycle,
  Command,
  CycleState,
  runCommands,
  generateState,
  getSignalStrength,
  getSignalSum,
  answer1,
  shouldLightUp,
  renderLine
} from '../../days/10/index';
import { generateEntries, splitLines } from '../../days/util/fileProcessing';

const generateFakeState = (count: number, start: number, end: number): CycleState => {
  return {
    count,
    startValue: start,
    endValue: end,
  };
}

const exampleOutput = 
`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

describe('[Day 10]', () => {
  describe('GenerateCommand', () => {
    test('input "noop" generates NoopCommand', () => {
      expect(generateCommand('noop')).toEqual({ type: 'noop' });
    });

    test('input "addx 1" generates AddXCommand', () => {
      expect(generateCommand('addx 1')).toEqual({ type: 'addX', value: 1 });
    });

    test('input "addx -3" generates AddXCommand', () => {
      expect(generateCommand('addx -3')).toEqual({ type: 'addX', value: -3 });
    });
  })

  describe('RunCommand', () => {
    test('Run noop command on empty states generates the first one', () => {
      const states: CycleState[] = [];
      const command: Command = {
        type: 'noop'
      };

      const newStates = runCommand(states, command);
      expect(newStates).toEqual([
        generateFakeState(1,1,1)
      ]);
    });

    test('Run addX command on empty states generates the first one', () => {
      const states: CycleState[] = [];
      const command: Command = {
        type: 'addX',
        value: 10,
      };

      const newStates = runCommand(states, command);
      expect(newStates).toEqual([
        generateFakeState(1,1,1),
        generateFakeState(2,1,11),
      ]);
    });
    test('Running addX command on existing states generates the next states', () => {
      const states: CycleState[] = [generateFakeState(1,1,1)];
      const command: Command = {
        type: 'addX',
        value: 10,
      };

      const newStates = runCommand(states, command);
      expect(newStates).toEqual([
        generateFakeState(1,1,1),
        generateFakeState(2,1,1),
        generateFakeState(3,1,11),
      ]);
    });
  })

  describe('GetLastCycle', () => {
    test('Gets the last item of an array', () => {
      const states: CycleState[] = [
        generateFakeState(1,1,1),
        generateFakeState(2,1,2),
      ];
      
      expect(getLastCycle(states)).toEqual(states[1]);
    });

    test('Generates an empty cycle if there is none', () => {
      const states: CycleState[] = [];
      
      expect(getLastCycle(states)).toEqual(
        generateFakeState(0,1,1),
      );
    });
  })

  describe('GenerateState', () => {
    test('Creates an empty state if no params are added', () => {
      expect(generateState()).toEqual(
        generateFakeState(0,1,1),
      );
    });

    test('Creates a state based on the previous one if there is no add', () => {
      const oldState = generateState();
      expect(generateState(oldState)).toEqual(
        generateFakeState(1,1,1),
      );
    });

    test('Creates a state with a new value when add is included', () => {
      const oldState = generateState();
      expect(generateState(oldState, 10)).toEqual(
        generateFakeState(1,1,11),
      );
    });

    test('Creates a state with a new value when a negative add is included', () => {
      const oldState = generateState();
      expect(generateState(oldState, -10)).toEqual(
        generateFakeState(1,1,-9),
      );
    });
  })

  describe('GetSignalStrength', () => {
    test('Multipliese the count and startValue to get a signal strength', () => {
      expect(getSignalStrength(generateFakeState(1,1,1))).toBe(1);
      expect(getSignalStrength(generateFakeState(10,5,10))).toBe(50);
    });
  })

  describe('getSignalSum', () => {
    test('Gets the sum of signals', () => {
      const states: CycleState[] = [
        generateFakeState(1,1,1), // 1
        generateFakeState(10,5,10) // 50
      ]

      expect(getSignalSum(states)).toBe(51);
    });
  })

  describe('Integration test answer 1', () => {
    describe('Short example', () => {
      const input = "noop\naddx 3\naddx -5";
      const lines = splitLines(input);
      const commands: Command[] = generateEntries(lines, generateCommand);
      const states = runCommands(commands);

      test('Cycles check', () => {
        expect(states[0]).toEqual(
          generateFakeState(1,1,1),
        );
        expect(states[1]).toEqual(
          generateFakeState(2,1,1),
        );
        expect(states[2]).toEqual(
          generateFakeState(3,1,4),
        );
        expect(states[3]).toEqual(
          generateFakeState(4,4,4),
        );
        expect(states[4]).toEqual(
          generateFakeState(5,4,-1),
        );
        expect(states[5]).toBeUndefined();
      })
      test('End state should be', () => {
        expect(getLastCycle(states)).toEqual(
          generateFakeState(5,4,-1),
        );
      });
      test('Command values should add up to total', () => {
        let total = 1;
        for (const command of commands) {
          if (command.type === 'addX') {
            total += command.value
          }
        }
        const lastState = getLastCycle(states);
        expect(lastState.endValue).toBe(total);
      });
    });
    describe('Large example', () => {
      const input = readFileSync('days/10/example.txt').toString();
      const lines = splitLines(input);
      const commands: Command[] = generateEntries(lines, generateCommand);
      const states = runCommands(commands);

      test('states', () => {
        expect(states[19]).toEqual(
          generateFakeState(20,21, 21),
        );
        expect(states[59]).toEqual(
          generateFakeState(60,19, 19),
        );
        expect(states[99]).toEqual(
          generateFakeState(100,18, 18),
        );
        expect(states[139]).toEqual(
          generateFakeState(140,21, 21),
        );
        expect(states[179]).toEqual(
          generateFakeState(180,16, 16),
        );
        expect(states[219]).toEqual(
          generateFakeState(220,18,19),
        );
      });
      test('signal strength', () => {
        expect(getSignalStrength(states[19])).toBe(420);
        expect(getSignalStrength(states[59])).toBe(1140);
        expect(getSignalStrength(states[99])).toBe(1800);
        expect(getSignalStrength(states[139])).toBe(2940);
        expect(getSignalStrength(states[179])).toBe(2880);
        expect(getSignalStrength(states[219])).toBe(3960);
      });
      test('sum', () => {
        const importantIndexes = [19, 59, 99, 139, 179, 219];
        const sum = getSignalSum(importantIndexes.map(i => states[i]));
        expect(sum).toBe(13140)
      })
    });
    describe('Input bugs', () => {
      const input = readFileSync('days/10/input.txt').toString();
      const lines = splitLines(input);
      const commands: Command[] = generateEntries(lines, generateCommand);
      let states: CycleState[] = [];

      // TODO: re-enable
      test('Run command step by step', () => {
        let lastCount = 0;
        for (const command of commands) {
          states = runCommand(states, command);
          const lastState = getLastCycle(states);
          const add = command.type === 'addX' ? command.value : 0;
          expect(lastState.endValue).toBe(lastState.startValue + add);
          if (command.type === 'noop') {
            expect(states.length).toBe(lastCount + 1);
          }
          if (command.type === 'addX') {
            expect(states.length).toBe(lastCount + 2);
          }
          lastCount = states.length;
        }
      });
      
      test('Command values should add up to total', () => {
        let states = runCommands(commands);
        let total = 1;
        for (const command of commands) {
          if (command.type === 'addX') {
            total += command.value
          }
        }
        const lastState = getLastCycle(states);
        expect(lastState.endValue).toBe(total);
      });

      test('Checking for wrong answers', () => {
        const answer = answer1();
        expect(answer).toBeLessThan(14350);
      })
    });
  })

  describe('ShouldLightUp', () => {
    test('Should light up if overlaps', () => {
      expect(shouldLightUp(4,3)).toBeTruthy();
      expect(shouldLightUp(4,4)).toBeTruthy();
      expect(shouldLightUp(4,5)).toBeTruthy();
    });

    test('Should not light up if does not overlap', () => {
      expect(shouldLightUp(4,2)).toBeFalsy();
      expect(shouldLightUp(4,6)).toBeFalsy();
    });
  })

  describe('RenderLine', () => {
    test('Should light up if overlaps', () => {
      const states = [
        generateFakeState(1,1,1),
        generateFakeState(2,9,9),
        generateFakeState(3,3,3)
      ];
      expect(renderLine(states)).toBe("# #");
    });

    test('Should not light up if does not overlap', () => {
      expect(shouldLightUp(4,2)).toBeFalsy();
      expect(shouldLightUp(4,6)).toBeFalsy();
    });
  })
})
