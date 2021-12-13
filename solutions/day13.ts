export default class Day13 {

  public solve(input: string): { part1: any, part2: any; } {
    const coords = input.split('\n\n')[0].split('\n').map(coords => coords.split(',').map(c => parseInt(c)));
    const folds = input.split('\n\n')[1].split('\n').map(folds => [folds.split(' ')[2].split('=')[0], parseInt(folds.split(' ')[2].split('=')[1])]);

    let paper = this._preparePaper(coords);

    paper = this._fold(paper, [folds.shift()]);

    const dotCountPart1 = this._countDots(paper);

    paper = this._fold(paper, folds);

    return { part1: dotCountPart1, part2: '\n' + this._formatPaper(paper) };
  }

  private _fold(paper: boolean[][], folds: (string | number)[][]) {
    for (const fold of folds) {
      if (fold[0] === 'y') {
        paper = this._foldY(paper, fold[1] as number);
      } else if (fold[0] === 'x') {
        paper = this._foldX(paper, fold[1] as number);
      }
    }
    return paper;
  }

  private _foldY(paper: boolean[][], foldIndex: number) {
    let firstHalf = paper.slice(0, foldIndex);
    let secondHalf = paper.slice(foldIndex + 1).reverse();
    if (firstHalf.length > secondHalf.length) {
      secondHalf = [new Array(paper[0].length).fill(false), ...secondHalf];
    }
    return this._combineArrays(firstHalf, secondHalf);
  }

  private _foldX(paper: boolean[][], foldIndex: number) {
    let firstHalf: boolean[][] = [];
    let secondHalf: boolean[][] = [];
    for (let y = 0; y < paper.length; y++) {
      firstHalf.push(paper[y].slice(0, foldIndex));
      secondHalf.push(paper[y].slice(foldIndex + 1).reverse());
    }
    return this._combineArrays(firstHalf, secondHalf);
  }

  private _combineArrays(first: boolean[][], second: boolean[][]) {
    const result: boolean[][] = [];
    for (let y = 0; y < first.length; y++) {
      if (!result[y]) {
        result[y] = [];
      }
      for (let x = 0; x < first[0].length; x++) {
        if (first[y][x] || second[y][x]) {
          result[y][x] = true;
        } else {
          result[y][x] = false;
        }
      }
    }
    return result;
  }

  private _preparePaper(coords: number[][]): boolean[][] {
    let maxY = 0;
    let maxX = 0;

    for (const coord of coords) {
      if (coord[1] > maxY) {
        maxY = coord[1];
      }
      if (coord[0] > maxX) {
        maxX = coord[0];
      }
    }

    const paper = [];
    for (let y = 0; y <= maxY; y++) {
      paper.push(new Array(maxX + 1).fill(false));
    }

    for (const coord of coords) {
      paper[coord[1]][coord[0]] = true;
    }
    return paper;
  }

  private _countDots(paper: boolean[][]) {
    let dotCount = 0;

    paper.forEach(line => {
      line.forEach(c => {
        if (c) {
          dotCount++;
        }
      });
    });

    return dotCount;
  }

  private _formatPaper(paper: boolean[][]) {
    let textString = '';
    paper.forEach(l => {
      l.forEach((c: any) => {
        if (c) {
          textString += '#';
        } else {
          textString += ' ';
        }
      });
      textString += '\n';
    });
    return textString;
  }
}
