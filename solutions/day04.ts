export default class Day4 {
  private _boards: number[][][];
  private _highlightedNumbers: number[];
  private _numbersInPool: number[];
  private _drawnNumbers: number[];

  public solve(input: string): { part1: any, part2: any; } {
    this._drawnNumbers = input.split('\n')[0].split(',').map(n => parseInt(n));

    this._boards = input.split('\n\n').slice(1).map(boardString => {
      const board: number[][] = [];
      boardString.split('\n').forEach((line) => {
        board.push(line.match(/.{1,3}/g).map(n => parseInt(n.trim())));
      });
      return board;
    });

    // part 1
    let winningBoard: number[][];
    let numbersDrawn = 5;
    while (!winningBoard) {
      this._numbersInPool = this._drawnNumbers.slice(0, numbersDrawn);
      winningBoard = this._boards.find(wb => this._checkForWinner(wb));
      numbersDrawn++;
    }

    let multiplyBy = this._highlightedNumbers[this._highlightedNumbers.length - 1];
    let totalOfNotHighlighted = 0;

    winningBoard.forEach(row => {
      row.forEach(number => {
        if (!this._numbersInPool.includes(number)) {
          totalOfNotHighlighted += number;
        }
      });
    });

    const part1Solution = totalOfNotHighlighted * multiplyBy;

    // part 2
    numbersDrawn = 5;
    const winningBoards: number[][][] = [];
    let editingBoards = [...this._boards];
    while (winningBoards.length < this._boards.length) {
      this._numbersInPool = this._drawnNumbers.slice(0, numbersDrawn);

      winningBoards.push(...editingBoards.filter(wb => this._checkForWinner(wb)));
      editingBoards = editingBoards.filter(b => !winningBoards.includes(b));

      numbersDrawn++;
    }

    const lastBoard = winningBoards[winningBoards.length - 1];

    multiplyBy = this._highlightedNumbers[this._highlightedNumbers.length - 1];
    totalOfNotHighlighted = 0;

    lastBoard.forEach(row => {
      row.forEach(number => {
        if (!this._numbersInPool.includes(number)) {
          totalOfNotHighlighted += number;
        }
      });
    });

    const part2Solution = totalOfNotHighlighted * multiplyBy;

    return { part1: part1Solution, part2: part2Solution };
  }

  private _checkForWinner(board: number[][]) {
    let found = false;

    // check rows
    board.forEach(row => {
      let bingo = true;
      if (!found) {
        this._highlightedNumbers = [];
        row.forEach(number => {
          this._highlightedNumbers.push(number);
          if (!this._numbersInPool.includes(number)) {
            bingo = false;
          }
        });
        if (bingo) {
          found = true;
        }
      }
    });

    // check columns
    for (let x = 0; x < 5; x++) {
      let bingo = true;
      if (!found) {
        this._highlightedNumbers = [];
        board.forEach(row => {
          this._highlightedNumbers.push(row[x]);
          if (!this._numbersInPool.includes(row[x])) {
            bingo = false;
          }
        });
        if (bingo) {
          found = true;
        }
      }
    }

    if (found) {
      this._highlightedNumbers = this._numbersInPool.filter(n => this._highlightedNumbers.includes(n));
    }

    return found;
  };
}
