import { ERROR_MESSAGES } from "../../constants/messages.js";

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
        const names = cars.map(car => car.getName());
        const namesSet = new Set(names);

        if (names.length < 2) {
            throw new Error(ERROR_MESSAGES.NOT_ENOUGH_CARS);
        }
        if (namesSet.size !== names.length) {
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
        const singleRoundResult = this.#cars.map((car) => car.race());
        this.#resultByRound.push(singleRoundResult);
    }

    startRace() {
        for (let i = 0; i < this.#tryCounts; i++) {
            this.#singleRound();
        }
    }

    getResults() {
        return this.#resultByRound;
    }

    getWinners() {
        const finalRoundResult = this.#resultByRound[this.#resultByRound.length - 1];
        if (!finalRoundResult) return [];

        const maxDistance = Math.max(...finalRoundResult.map(car => car.currentDistance));
        const winners = finalRoundResult.filter(car => car.currentDistance === maxDistance);
        
        return winners;
    }
}

export default Race;