export default class Day1 {

  private _pairs: { [key: string]: number; } = {};
  private _elements: { [key: string]: number; } = {};
  private _instructions: { [key: string]: string; } = {};

  public solve(input: string): { part1: any, part2: any; } {
    let polymer = input.split('\n\n')[0];
    const instructions = input.split('\n\n')[1].split('\n').map(i => [i.split(' -> ')[0], i.split(' -> ')[1]]);

    instructions.forEach(i => this._instructions[i[0]] = i[1]);

    this._calcInitialPairs(polymer);

    for (let i = 0; i < 10; i++) {
      this._executeStep();
    }

    const { highest: highest1, lowest: lowest1 } = this._getHighestAndLowest();
    const solutionPart1 = highest1 - lowest1;

    for (let i = 10; i < 40; i++) {
      this._executeStep();
    }

    const { highest: highest2, lowest: lowest2 } = this._getHighestAndLowest();
    const solutionPart2 = highest2 - lowest2;

    return { part1: solutionPart1, part2: solutionPart2 };
  }

  private _executeStep() {
    const pairsToAdd: { [key: string]: number; } = Object.assign({}, this._pairs);

    for (const i in this._instructions) {
      if (this._pairs.hasOwnProperty(i)) {
        const amount = this._pairs[i];
        const first = i[0] + this._instructions[i];
        const second = this._instructions[i] + i[1];

        if (pairsToAdd[i]) {
          pairsToAdd[i] = pairsToAdd[i] - amount;
        } else if (this._pairs[i]) {
          pairsToAdd[i] = 0;
        }

        if (!pairsToAdd[first]) {
          pairsToAdd[first] = amount;
        } else {
          pairsToAdd[first] += amount;
        }
        if (!pairsToAdd[second]) {
          pairsToAdd[second] = amount;
        } else {
          pairsToAdd[second] += amount;
        }

        if (!this._elements[this._instructions[i]]) {
          this._elements[this._instructions[i]] = amount;
        } else {
          this._elements[this._instructions[i]] += amount;
        }
      }
    }

    for (const pair in pairsToAdd) {
      this._pairs[pair] = pairsToAdd[pair];
    }
  }

  private _calcInitialPairs(polymer: string) {
    const polymerArr = polymer.split('');

    for (let i = 0; i < polymerArr.length; i++) {
      if (polymerArr[i + 1]) {
        if (!this._pairs[polymerArr[i] + polymerArr[i + 1]]) {
          this._pairs[polymerArr[i] + polymerArr[i + 1]] = 1;
        } else {
          this._pairs[polymerArr[i] + polymerArr[i + 1]] += 1;
        }
      }
      if (!this._elements[polymerArr[i]]) {
        this._elements[polymerArr[i]] = 1;
      } else {
        this._elements[polymerArr[i]] += 1;
      }
    }
  }

  private _getHighestAndLowest() {
    let highest = 0;
    let lowest = Number.MAX_VALUE;
    Object.values(this._elements).forEach(v => {
      if (v > highest) {
        highest = v;
      }
      if (v < lowest) {
        lowest = v;
      }
    });
    return { highest, lowest };
  }
}
