export default class Day12 {

  private _connections: string[][];
  private _foundPaths: number[][][] = [];

  public solve(input: string): { part1: any, part2: any; } {
    this._connections = input.split('\n').map(line => line.split('-'));

    const starts: number[][] = [];
    this._connections.forEach((c, i) => {
      if (c[0] === 'start') {
        starts.push([i, 1]);
      } else if (c[1] === 'start') {
        starts.push([i, 0]);
      }
    });

    starts.forEach(s => {
      this._findPath([s], false);
    });

    const waysOutPart1 = this._foundPaths.length;

    this._foundPaths = [];

    starts.forEach(s => {
      this._findPath([s], true);
    });

    const waysOutPart2 = this._foundPaths.length;

    return { part1: waysOutPart1, part2: waysOutPart2 };
  }

  private _findPath(path: number[][], extraSmallCave: boolean) {
    const lastPathIndex = path.length - 1;
    this._connections.forEach((c, i) => {
      if (
        c[0] === this._connections[path[lastPathIndex][0]][path[lastPathIndex][1]] &&
        c[1] !== 'end' &&
        c[1] !== 'start' &&
        (!path.some(p => c[1] === this._connections[p[0]][p[1]] && this._connections[p[0]][p[1]].match(/^[a-z]+$/)) ||
          (path.filter(p => c[1] === this._connections[p[0]][p[1]] && this._connections[p[0]][p[1]].match(/^[a-z]+$/)).length === 1 && extraSmallCave))
      ) {
        this._findPath([...path, [i, 1]], extraSmallCave && path.filter(p => c[1] === this._connections[p[0]][p[1]] && this._connections[p[0]][p[1]].match(/^[a-z]+$/)).length === 0);
      } else if (
        c[1] === this._connections[path[lastPathIndex][0]][path[lastPathIndex][1]] &&
        c[0] !== 'end' &&
        c[0] !== 'start' &&
        (!path.some(p => c[0] === this._connections[p[0]][p[1]] && this._connections[p[0]][p[1]].match(/^[a-z]+$/)) ||
          (path.filter(p => c[0] === this._connections[p[0]][p[1]] && this._connections[p[0]][p[1]].match(/^[a-z]+$/)).length === 1 && extraSmallCave))
      ) {
        this._findPath([...path, [i, 0]], extraSmallCave && path.filter(p => c[0] === this._connections[p[0]][p[1]] && this._connections[p[0]][p[1]].match(/^[a-z]+$/)).length === 0);
      }
    });

    let lastPath;
    this._connections.forEach((c, i) => {
      if (c[0] === 'end' && c[1] === this._connections[path[lastPathIndex][0]][path[lastPathIndex][1]]) {
        lastPath = [i, 0];
      } else if (c[1] === 'end' && c[0] === this._connections[path[lastPathIndex][0]][path[lastPathIndex][1]]) {
        lastPath = [i, 1];
      }
    });
    if (lastPath) {
      path.push(lastPath);
      this._foundPaths.push(path);
    }
  }
}
