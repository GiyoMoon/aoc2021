import { Solver } from './solver';

const solver = new Solver();

const currentDay = new Date().getDate();

for (let day = 1; day <= currentDay; day++) {
  solver.run(day);
}
