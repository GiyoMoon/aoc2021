export default class Day6 {

  private _fishes: number[];

  public solve(input: string): { part1: any, part2: any; } {
    const inputFishes = input.split(',').map(n => parseInt(n));

    this._fishes = new Array(9).fill(0);
    inputFishes.forEach(fish => {
      this._fishes[fish]++;
    });

    for (let i = 0; i < 80; i++) {
      this._processDay();
    }

    const totalFishPart1 = this._fishes.reduce((x, a) => x + a);

    for (let i = 0; i < 256 - 80; i++) {
      this._processDay();
    }

    const totalFishPart2 = this._fishes.reduce((x, a) => x + a);


    return { part1: totalFishPart1, part2: totalFishPart2 };
  }

  private _processDay() {
    let tempFishes = new Array(9).fill(0);
    this._fishes.forEach((fish, i) => {
      if (i === 0) {
        tempFishes[8] = fish;
        tempFishes[6] += fish;
      } else {
        tempFishes[i - 1] += fish;
      }
    });
    this._fishes = tempFishes;
  }
}
