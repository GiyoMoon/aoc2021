export default class Day3 {

  private _binaryInput: string[];

  public solve(input: string): { part1: any, part2: any; } {
    this._binaryInput = input.split('\n');

    // part 1
    let bitCounts = new Array(this._binaryInput[0].length).fill(0);
    this._binaryInput.forEach((bit) => {
      const dArray = bit.split('');
      dArray.forEach((bit, i) => {
        if (bit === '1') {
          bitCounts[i] += 1;
        };
      });
    });

    const inputCount = this._binaryInput.length;
    let gamma = '';
    let epsilon = '';

    bitCounts.forEach((b) => {
      if (b >= inputCount / 2) {
        gamma += '1';
        epsilon += '0';
      } else {
        gamma += '0';
        epsilon += '1';
      }
    });

    const part1Result = parseInt(gamma, 2) * parseInt(epsilon, 2);

    // part 2
    const generatorRating = this._getRating(1);
    const scrubberRating = this._getRating(0);

    const part2Result = parseInt(generatorRating, 2) * parseInt(scrubberRating, 2);

    return { part1: part1Result, part2: part2Result };
  }

  private _getRating(lookingFor: number) {
    let filteredInput = [...this._binaryInput];
    for (let i = 0; filteredInput.length > 1; i++) {
      const mostCommon = this._getMostCommonBit(filteredInput, i, lookingFor);
      filteredInput = filteredInput.filter(v => {
        const vArray = v.split('');
        return vArray[i] === mostCommon;
      });
    }
    return filteredInput[0];
  }

  private _getMostCommonBit(numbers: string[], index: number, lookingFor: number) {
    const totalNumbers = numbers.length;
    let bits = 0;
    numbers.forEach(n => {
      if (n[index] === '1') {
        bits++;
      };
    });

    let number;
    if (lookingFor === 1) {
      number = bits >= totalNumbers / 2 ? 1 : 0;
    } else {
      number = bits >= totalNumbers / 2 ? 0 : 1;
    }
    return number.toString();
  }
}
