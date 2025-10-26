import { ERROR_MESSAGES } from '../../constants/messages.js';

class Race {
  #cars;
  #tryCounts;
  #resultByRound;

  constructor(cars, tryCounts) {
    this.#cars = cars;
    this.#tryCounts = tryCounts;
    this.#resultByRound = [];
  }

  static #validateCars(cars) {
    const namesSet = new Set(cars);
    if (cars.length < 2) {
      throw new Error(ERROR_MESSAGES.NOT_ENOUGH_CARS);
    }
    if (namesSet.size !== cars.length) {
        console.log(namesSet.size, cars.length);
      throw new Error(ERROR_MESSAGES.DUPLICATE_CAR);
    }
  }

  static #validateTryCount(tryCount) {
    if (tryCount <= 0) {
      throw new Error(ERROR_MESSAGES.TRYCOUNT_IS_INVALID);
    }
  }

  static create(cars, tryCount) {
    this.#validateCars(cars);
    this.#validateTryCount(tryCount);
    return new Race(cars, tryCount);
  }

  #singleRound() {
    const currentRoundStates = this.#cars.map(car => car.race());
    this.#resultByRound.push(currentRoundStates);
  }

  startRace() {
    for (let i = 0; i < this.#tryCounts; i++) {
      this.#singleRound();
    }
  }

  formatResults() {
    const formatRound = (roundResult) =>
      roundResult
        .map((car) => {
          const distanceDisplay = "-".repeat(car.currentDistance);
          return `${car.name} : ${distanceDisplay}`;
        })
        .join("\n");
    return this.#resultByRound.map(formatRound).join("\n\n");
  }

  findWinners() {    
    const finalRoundResult = this.#resultByRound[this.#resultByRound.length - 1];
    const maxDistance = Math.max(...finalRoundResult.map(carState => carState.currentDistance));
    const winners = finalRoundResult.filter(carState => carState.currentDistance === maxDistance);
    
    return winners.map((winnerState) => winnerState.name).join(", ");
  }
}

export default Race;