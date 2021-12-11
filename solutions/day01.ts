export default class Day1 {

  public solve(input: string): { part1: any, part2: any; } {
    const inputNumbers = input.split('\n').map(n => parseInt(n));

    // part 1
    let nBefore: number | undefined;
    let largerNumbersPart1 = 0;
    inputNumbers.forEach(n => {
      if (nBefore && n > nBefore) {
        largerNumbersPart1++;
      }
      nBefore = n;
    });

    // part 2
    const sums: number[] = [];
    inputNumbers.forEach((n, i) => {
      if (i > 1) {
        sums.push(n + inputNumbers[i - 1] + inputNumbers[i - 2]);
      }
    });

    nBefore = undefined;
    let largerNumbersPart2 = 0;
    sums.forEach(n => {
      if (nBefore && n > nBefore) {
        largerNumbersPart2++;
      }
      nBefore = n;
    });

    return { part1: largerNumbersPart1, part2: largerNumbersPart2 };
  }
}
