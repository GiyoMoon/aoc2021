export default class Day5 {

  private _heatmap: number[][];

  public solve(input: string): { part1: any, part2: any; } {
    const vents = input.split('\n').map(v => {
      const coords = v.split(' -> ');
      return [...coords[0].split(',').map(n => parseInt(n)), ...coords[1].split(',').map(n => parseInt(n))];
    });

    // part 1
    let filteredVents = vents.filter(v => v[0] === v[2] || v[1] === v[3]);
    this._heatmap = [];

    filteredVents.forEach(vent => {
      if (vent[0] === vent[2]) {
        this._addHorizontalVent(vent);
      } else {
        this._addVerticalVent(vent);
      }
    });

    const criticalCoordsPart1 = this._getCriticalCoords();

    // part 2
    filteredVents = vents.filter(v => v[0] === v[2] || v[1] === v[3] || Math.abs(v[0] - v[2]) === Math.abs(v[1] - v[3]));
    this._heatmap = [];

    filteredVents.forEach(vent => {
      if (vent[0] === vent[2]) {
        this._addHorizontalVent(vent);
      } else if (vent[1] === vent[3]) {
        this._addVerticalVent(vent);
      } else {
        this._addDiagonalVent(vent);
      }
    });

    const criticalCoordsPart2 = this._getCriticalCoords();

    return { part1: criticalCoordsPart1, part2: criticalCoordsPart2 };
  }

  private _addHorizontalVent(vent: number[]) {
    const lowerCoord = vent[1] > vent[3] ? vent[3] : vent[1];
    new Array(Math.abs(vent[1] - vent[3]) + 1).fill('').forEach((_, i) => {
      if (!this._heatmap[lowerCoord + i]) {
        this._heatmap[lowerCoord + i] = [];
      }
      if (this._heatmap[lowerCoord + i][vent[0]]) {
        this._heatmap[lowerCoord + i][vent[0]] += 1;
      } else {
        this._heatmap[lowerCoord + i][vent[0]] = 1;
      }
    });
  }

  private _addVerticalVent(vent: number[]) {
    const lowerCoord = vent[0] > vent[2] ? vent[2] : vent[0];
    new Array(Math.abs(vent[2] - vent[0]) + 1).fill('').forEach((_, i) => {
      if (!this._heatmap[vent[1]]) {
        this._heatmap[vent[1]] = [];
      }
      if (this._heatmap[vent[1]][lowerCoord + i]) {
        this._heatmap[vent[1]][lowerCoord + i] += 1;
      } else {
        this._heatmap[vent[1]][lowerCoord + i] = 1;
      }
    });
  };

  private _addDiagonalVent(vent: number[]) {
    const lowerCoordY = vent[1] > vent[3] ? vent[3] : vent[1];
    const turn = vent[1] > vent[3] ? true : false;
    let multiplier = 1;
    if (turn && vent[2] < vent[0]) {
      multiplier = -1;
    } else if (!turn && vent[2] < vent[0]) {
      multiplier = -1;
    }

    new Array(Math.abs(vent[1] - vent[3]) + 1).fill('').forEach((_, i) => {
      const x = turn ? (vent[2] - i * multiplier) : (vent[0] + i * multiplier);
      if (!this._heatmap[lowerCoordY + i]) {
        this._heatmap[lowerCoordY + i] = [];
      }
      if (this._heatmap[lowerCoordY + i][x]) {
        this._heatmap[lowerCoordY + i][x] += 1;
      } else {
        this._heatmap[lowerCoordY + i][x] = 1;
      }
    });
  }

  private _getCriticalCoords() {
    let criticalCoords = 0;
    this._heatmap.forEach(line => {
      if (line) {
        line.forEach(m => {
          if (m && m > 1) {
            criticalCoords++;

          }
        });
      }
    });
    return criticalCoords;
  }
}
