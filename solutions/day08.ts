export default class Day8 {

  public solve(input: string): { part1: any, part2: any; } {
    const entries = input.split('\n').map(e => {
      e = e.replace(' | ', ' ');
      const eArray = e.split(' ');
      return eArray;
    });

    // part 1
    let easyDigitCount = 0;
    entries.forEach(e => {
      e.slice(10).forEach(output => {
        if (
          output.length === 2 ||
          output.length === 3 ||
          output.length === 4 ||
          output.length === 7
        ) {
          easyDigitCount++;
        }
      });
    });

    // part 2
    let totalValue = 0;
    entries.forEach(e => {
      const mapping = this._getMappingConfig(e);
      const outputValue = this._getOutputValue(e.slice(10), mapping);
      totalValue += outputValue;
    });

    return { part1: easyDigitCount, part2: totalValue };
  }

  private _getMappingConfig(entry: string[]) {
    const mapping: string[] = new Array(10).fill('');

    // get easy digits
    entry.forEach(digit => {
      if (digit.length === 2) {
        mapping[1] = digit;
      } else if (digit.length === 3) {
        mapping[7] = digit;
      } else if (digit.length === 4) {
        mapping[4] = digit;
      } else if (digit.length === 7) {
        mapping[8] = digit;
      }
    });

    entry.slice(0, 10).forEach(digit => {
      // 0, 6 or 9
      if (digit.length === 6) {
        if (digit.split('').filter(s => mapping[1].includes(s)).length === 1) {
          mapping[6] = digit;
        } else if (digit.split('').filter(s => mapping[4].includes(s)).length === 3) {
          mapping[0] = digit;
        } else {
          mapping[9] = digit;
        }
        // 2, 3 or 5
      } else if (digit.length === 5) {
        if (digit.split('').filter(s => mapping[4].includes(s)).length !== 3) {
          mapping[2] = digit;
        } else if (digit.split('').filter(s => mapping[1].includes(s)).length === 1) {
          mapping[5] = digit;
        } else {
          mapping[3] = digit;
        }
      }
    });
    return mapping;
  }

  private _getOutputValue(outputs: string[], mapping: string[]) {
    let output = '';
    outputs.map(o => {
      output += mapping.findIndex(m => {
        return o.split('').filter(s => m.includes(s)).length === m.length && o.length === m.length;
      });
    });
    return parseInt(output);
  }
}
