export default class Day9 {

  public solve(input: string): { part1: any, part2: any; } {
    const lavaTubes = input.split('\n').map(line => line.split('').map(v => parseInt(v)));

    // part 1
    const lowestPoints: number[][] = [];
    lavaTubes.forEach((line, y) => {
      line.forEach((point, x) => {
        if (
          (line[x - 1] === undefined || line[x - 1] > point) &&
          (line[x + 1] === undefined || line[x + 1] > point) &&
          (lavaTubes[y - 1] === undefined || lavaTubes[y - 1] && lavaTubes[y - 1][x] > point) &&
          (lavaTubes[y + 1] === undefined || lavaTubes[y + 1] && lavaTubes[y + 1][x] > point)
        ) {
          lowestPoints.push([y, x]);
        }
      });
    });

    const riskLevel = lowestPoints.map(lp => lavaTubes[lp[0]][lp[1]]).reduce((x, a) => x + a) + lowestPoints.length;

    // part 2
    const basins: number[] = [];
    lowestPoints.forEach(lp => {
      const basinSize = this._getBasinSize(lp, lavaTubes);
      basins.push(basinSize);
    });

    const multipliedTopBasins = basins.sort((a, b) => b - a).slice(0, 3).reduce((x, a) => x * a);

    return { part1: riskLevel, part2: multipliedTopBasins };
  }

  private _getBasinSize(lp: number[], lavaTubes: number[][]) {
    let basinFlow: number[][][] = [[lp]];

    for (let position = 0; position < basinFlow.length; position++) {
      if (!basinFlow[position + 1]) {
        basinFlow[position + 1] = [];
      }
      const positions = basinFlow[position];
      positions.forEach(pos => {
        let posX = [pos[1] - 1, pos[1] + 1, pos[1], pos[1]];
        let posY = [pos[0], pos[0], pos[0] - 1, pos[0] + 1];
        for (let i = 0; i < posX.length; i++) {
          if (
            lavaTubes[posY[i]] && lavaTubes[posY[i]][posX[i]] > lavaTubes[pos[0]][pos[1]] &&
            lavaTubes[posY[i]][posX[i]] !== 9
          ) {
            basinFlow[position + 1].push([posY[i], posX[i]]);
          }
        }
      });
      if (basinFlow[position + 1].length === 0) {
        basinFlow.pop();
      }
    }

    let uniquePositions: number[][] = [];
    basinFlow.filter(basinFlow => {
      basinFlow.forEach(pos => {
        if (!uniquePositions.some(up => up[0] === pos[0] && up[1] === pos[1])) {
          uniquePositions.push(pos);
        }
      });
    });

    return uniquePositions.length;
  }

}
