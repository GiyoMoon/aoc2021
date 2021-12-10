export default class Day10 {

  public solve(input: string): { part1: any, part2: any; } {
    const lines = input.split('\n').map(line => line.split(''));

    const errorScores: { [key: string]: number; } = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    };

    const completeScores: { [key: string]: number; } = {
      '(': 1,
      '[': 2,
      '{': 3,
      '<': 4
    };

    const invalidChars: string[] = [];
    const autoCompleteScores: number[] = [];

    let validLines = [...lines];
    for (const line of lines) {
      const openBrackets: string[] = [];
      let invalidChar: string;

      for (const char of line) {
        if (invalidChar) {
          validLines = validLines.filter(l => l !== line);
          break;
        }
        switch (char) {
          case '(':
          case '[':
          case '{':
          case '<':
            openBrackets.push(char);
            break;
          default:
            const lastOpenBracket = openBrackets[openBrackets.length - 1];
            if (
              lastOpenBracket === '(' && char !== ')' ||
              lastOpenBracket === '[' && char !== ']' ||
              lastOpenBracket === '{' && char !== '}' ||
              lastOpenBracket === '<' && char !== '>'
            ) {
              invalidChar = char;
            } else {
              openBrackets.pop();
            }
        }
      };

      if (invalidChar) {
        invalidChars.push(invalidChar);
      } else {
        let score = 0;
        for (const bracket of openBrackets.reverse()) {
          score *= 5;
          score += completeScores[bracket];
        }
        autoCompleteScores.push(score);
      }
    }

    const syntaxErrorScore = invalidChars.map((c): number => {
      return errorScores[c];
    }).reduce((x, a) => x + a);

    const middleScore = autoCompleteScores.sort((a, b) => b - a)[Math.floor(autoCompleteScores.length / 2)];

    return { part1: syntaxErrorScore, part2: middleScore };
  }
}
