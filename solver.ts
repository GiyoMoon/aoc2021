import fs from 'fs';
import chalk from 'chalk';

export class Solver {
  public run(day: string) {
    const solutions = fs.readdirSync(`./solutions`).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    if (solutions.some(solution => solution === `day${day}.ts` || solution === `day${day}.js`)) {
      const todaysSolution = solutions.find(solution => solution === `day${day}.ts` || solution === `day${day}.js`);

      const DAYSOLVER = require(`./solutions/${todaysSolution}`).default;
      const daySolverInstance = new DAYSOLVER();

      let inputData: string | undefined;
      try {
        inputData = fs.readFileSync(`../data/day${day}.txt`, { encoding: 'utf8' });
      } catch {
        try {
          inputData = fs.readFileSync(`./data/day${day}.txt`, { encoding: 'utf8' });
        } catch {
          console.error(`There is no input data for day ${day}`);
          return;
        }
      }

      const start = process.hrtime();
      const results = daySolverInstance.solve(inputData);
      const end = process.hrtime(start);

      console.log(`=====${chalk.greenBright(`Day ${day}`)}======`);
      console.log(`| Part ${chalk.yellow('1')}: ${chalk.hex('#808eff')(results.part1)}`);
      console.log(`| Part ${chalk.yellow('2')}: ${chalk.hex('#808eff')(results.part2)}`);

      const took = (end[0] * 1000000000 + end[1]) / 1000000;
      console.log(`| Took ${chalk.cyan(took.toFixed(4))} ms`);
      return took;
    } else {
      console.error(`There is no solution for day ${day}`);
    }
  }
}
