export default class Day2 {

  public solve(input: string): { part1: any, part2: any; } {
    const splittedIntructions = input.split('\n');

    // part 1
    let horizontal = 0;
    let depth = 0;

    splittedIntructions.forEach(instruction => {
      const inst = instruction.split(' ')[0];
      const value = parseInt(instruction.split(' ')[1]);
      switch (inst) {
        case 'forward':
          horizontal += value;
          break;
        case 'up':
          depth -= value;
          break;
        case 'down':
          depth += value;
          break;
      }
    });

    const part1Result = horizontal * depth;

    // part 2
    horizontal = 0;
    depth = 0;
    let aim = 0;

    splittedIntructions.forEach(instruction => {
      const inst = instruction.split(' ')[0];
      const value = parseInt(instruction.split(' ')[1]);
      switch (inst) {
        case 'forward':
          horizontal += value;
          depth += (aim * value);
          break;
        case 'up':
          aim -= value;
          break;
        case 'down':
          aim += value;
          break;
      }
    });

    const part2Result = horizontal * depth;

    return { part1: part1Result, part2: part2Result };
  }
}
