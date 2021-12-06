import fs from 'fs';

export class Solver {
  public run(day: number) {
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

      const results = daySolverInstance.solve(inputData);
      console.log(`====Day ${day}====`);
      console.log(results);
    } else {
      console.error(`There is no solution for day ${day}`);
    }
  }
}
