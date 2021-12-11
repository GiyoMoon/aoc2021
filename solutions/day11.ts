export default class Day11 {

  private _octos: number[][];
  private _flashCount = 0;
  private _alreadyFlashed: number[][] = [];

  public solve(input: string): { part1: any, part2: any; } {
    this._octos = input.split('\n').map(line => line.split('').map(o => parseInt(o)));

    for (let step = 0; step < 100; step++) {
      this._runStep();
    }

    this._octos = input.split('\n').map(line => line.split('').map(o => parseInt(o)));

    let allFlashed = false;
    let stepWhereAllFlashed: number;
    for (let step = 1; !allFlashed; step++) {
      this._runStep();
      let notFlashed = false;
      this._octos.forEach((l) => {
        l.forEach((o) => {
          if (o !== 0) {
            notFlashed = true;
          }
        });
      });
      if (!notFlashed) {
        allFlashed = true;
        stepWhereAllFlashed = step;
      }
    }

    return { part1: this._flashCount, part2: stepWhereAllFlashed };
  }

  private _runStep() {
    this._octos = this._octos.map(line => line.map(o => o + 1));

    this._checkFlashes();

    this._resetFlashedOctos();
  }

  private _checkFlashes() {
    let hadFlashes = false;

    this._octos.forEach((l, li) => {
      l.forEach((o, oi) => {
        if (o > 9) {
          if (this._alreadyFlashed.some((coords: number[]) => coords[0] === li && coords[1] === oi)) {
            return;
          }
          this._alreadyFlashed.push([li, oi]);
          this._flashCount += 1;
          // left, right, top left, top, top right, bot left, bot, bot right
          const y = [li, li, li - 1, li - 1, li - 1, li + 1, li + 1, li + 1];
          const x = [oi - 1, oi + 1, oi - 1, oi, oi + 1, oi - 1, oi, oi + 1];
          for (let n = 0; n < y.length; n++) {
            if (
              this._octos[y[n]] &&
              this._octos[y[n]][x[n]] <= 9 &&
              !this._alreadyFlashed.some((coords: number[]) => coords[0] === y[n] && coords[1] === x[n])
            ) {
              this._octos[y[n]][x[n]] += 1;
              if (this._octos[y[n]][x[n]] > 9) {
                hadFlashes = true;
              }
            }
          }
        }
      });
    });

    if (hadFlashes) {
      this._checkFlashes();
    }
  }

  private _resetFlashedOctos() {
    this._octos.forEach((l, li) => {
      l.forEach((o, oi) => {
        if (o > 9) {
          this._octos[li][oi] = 0;
        }
      });
    });
    this._alreadyFlashed = [];
  }
}
