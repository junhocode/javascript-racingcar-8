import CONSTANTS from '../../constants/constants.js';
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
    const names = cars.map(car => car.name);
    const namesSet = new Set(names);

    if (cars.length < 2) {
      throw new Error(ERROR_MESSAGES.NOT_ENOUGH_CARS);
    }
    if (namesSet.size !== cars.length) {
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
    this.#cars.forEach(car => car.move());
    const currentRoundStates = this.#cars.map(car => ({
      name: car.name,
      position: car.position,
    }));
    this.#resultByRound.push(currentRoundStates);
  }

  start() {
    for (let i = 0; i < this.#tryCounts; i++) {
      this.#singleRound();
    }
  }

  formatResults() {
    const formatRound = (roundResult) =>
      roundResult
        .map((carState) => {
          const positionDisplay = CONSTANTS.POSITION_MARK.repeat(carState.position);
          return `${carState.name} : ${positionDisplay}`;
        })
        .join("\n");
        
    return this.#resultByRound.map(formatRound).join("\n\n");
  }

  findWinners() {    
    const finalRoundResult = this.#resultByRound[this.#resultByRound.length - 1];
    
    const maxPosition = Math.max(...finalRoundResult.map(carState => carState.position));
    const winners = finalRoundResult.filter(carState => carState.position === maxPosition);
    
    return winners.map((winnerState) => winnerState.name).join(", ");
  }
}

export default Race;