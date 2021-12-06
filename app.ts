import { Solver } from './solver';

const solver = new Solver();

const currentDay = new Date().getDate();
if (process.argv[2]) {
  solver.run(currentDay);
} else {
  for (let day = 1; day <= currentDay; day++) {
    solver.run(day);
  }
}
