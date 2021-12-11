import { Solver } from './solver';

const solver = new Solver();

const currentDay = new Date().getDate();
if (process.argv[2]) {
  solver.run(currentDay < 10 ? `0${currentDay}` : currentDay.toString());
} else {
  for (let day = 1; day <= currentDay; day++) {
    solver.run(day < 10 ? `0${day}` : day.toString());
  }
}
