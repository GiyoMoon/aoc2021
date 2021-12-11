import chalk from 'chalk';
import { Solver } from './solver';

const solver = new Solver();

const currentDay = new Date().getDate();
if (process.argv[2]) {
  solver.run(currentDay < 10 ? `0${currentDay}` : currentDay.toString());
} else {
  let totalExecutionTime = 0;
  for (let day = 1; day <= currentDay; day++) {
    totalExecutionTime += solver.run(day < 10 ? `0${day}` : day.toString());
  }
  console.log('Took ' + chalk.blue(`${totalExecutionTime.toFixed(4)}`) + ' ms to execute ' + chalk.green(`${currentDay}`) + ' days');
}
