export default class Day15 {

  private _points: { distance: number; value: number; visited: boolean; }[][] = [];

  public solve(input: string): { part1: any, part2: any; } {
    const inputPoints = input.split('\n').map(l => l.split('').map(c => parseInt(c)));

    this._initPoints(inputPoints);

    let finished = false;
    while (!finished) {
      const shortestDistanceCoord = this._findShortestDistance();
      if (
        shortestDistanceCoord[0] === null &&
        shortestDistanceCoord[1] === null
      ) {
        finished = true;
        break;
      }
      this._updateAdjacent(shortestDistanceCoord);
    }

    const lastPointDistancePart1 = this._points[this._points.length - 1][this._points[0].length - 1].distance;

    this._initBigPoints(inputPoints);

    finished = false;
    while (!finished) {
      const shortestDistanceCoord = this._findShortestDistance();
      if (
        shortestDistanceCoord[0] === null &&
        shortestDistanceCoord[1] === null
      ) {
        finished = true;
        break;
      }
      this._updateAdjacent(shortestDistanceCoord);
    }

    const lastPointDistancePart2 = this._points[this._points.length - 1][this._points[0].length - 1].distance;

    return { part1: lastPointDistancePart1, part2: lastPointDistancePart2 };
  }

  private _findShortestDistance() {
    let distance = Number.MAX_VALUE;
    const shortestDistance: [number, number] = [null, null];
    this._points.forEach((l, y) => {
      l.forEach((c, x) => {
        if (!c.visited && c.distance < distance) {
          distance = c.distance;
          shortestDistance[0] = y;
          shortestDistance[1] = x;
        }
      });
    });
    return shortestDistance;
  }

  private _updateAdjacent(sDC: [number, number]) {
    const distance = this._points[sDC[0]][sDC[1]].distance;
    this._points[sDC[0]][sDC[1]].visited = true;

    const yCoords = [sDC[0] + 1, sDC[0] - 1, sDC[0], sDC[0]];
    const xCoords = [sDC[1], sDC[1], sDC[1] + 1, sDC[1] - 1];

    for (let i = 0; i < yCoords.length; i++) {
      if (this._points[yCoords[i]] && this._points[yCoords[i]][xCoords[i]]) {
        const oldDistance = this._points[yCoords[i]][xCoords[i]].distance;
        const newDistance = distance + this._points[yCoords[i]][xCoords[i]].value;
        this._points[yCoords[i]][xCoords[i]].distance = oldDistance > newDistance ? newDistance : oldDistance;
      }
    }
  }

  private _initPoints(inputPoints: number[][]) {
    inputPoints.forEach((l, y) => {
      if (!this._points[y]) {
        this._points[y] = [];
      }
      l.forEach((c, x) => {
        this._points[y][x] = { distance: Number.MAX_VALUE, value: c, visited: false };
      });
    });
    this._points[0][0].distance = 0;
  }

  private _initBigPoints(inputPoints: number[][]) {
    const size = inputPoints.length;
    inputPoints.forEach((l, y) => {
      l.forEach((c, x) => {
        for (let yy = 0; yy < 5; yy++) {
          for (let xx = 0; xx < 5; xx++) {
            if (!this._points[y + size * yy]) {
              this._points[y + size * yy] = [];
            }
            const value = (c + yy + xx) % 9 === 0 ? 9 : (c + yy + xx) % 9;
            this._points[y + size * yy][x + size * xx] = { distance: Number.MAX_VALUE, value, visited: false };
          }
        }
      });
    });
    this._points[0][0].distance = 0;
  }
}
