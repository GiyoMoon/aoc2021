export default class Day7 {

  private _crabs: number[];

  public solve(input: string): { part1: any, part2: any; } {

    this._crabs = input.split(',').map(n => parseInt(n)).sort();

    let lowestFuel = Number.MAX_VALUE;
    let currentFuel = 0;
    for (let i = this._crabs[0]; currentFuel <= lowestFuel; i++) {
      currentFuel = this._calculateFuelConsumption(i, false);
      if (currentFuel < lowestFuel) {
        lowestFuel = currentFuel;
      }
    }

    const lowestFuelPart1 = lowestFuel;

    // part 2
    lowestFuel = Number.MAX_VALUE;
    currentFuel = 0;
    for (let i = this._crabs[0]; currentFuel <= lowestFuel; i++) {
      currentFuel = this._calculateFuelConsumption(i, true);
      if (currentFuel < lowestFuel) {
        lowestFuel = currentFuel;
      }
    }

    const lowestFuelPart2 = lowestFuel;

    return { part1: lowestFuelPart1, part2: lowestFuelPart2 };
  }

  private _calculateFuelConsumption(targetPosition: number, getsMoreExpensive: boolean) {
    let fuelUsed = 0;
    this._crabs.forEach(c => {
      const neededFuel = Math.abs(c - targetPosition);
      const additionalFuel = ((neededFuel - 1) * (neededFuel)) / 2;
      fuelUsed += neededFuel + (getsMoreExpensive ? additionalFuel : 0);
    });

    return fuelUsed;
  }
}
