import { Random } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "../../constants/messages.js";
import CONSTANTS from "../../constants/constants.js";

class Car {
    #name;
    #position;

    constructor(name) {
        this.#name = name;
        this.#position = 0;
    }

    get name() {
        return this.#name;
    }

    get position() {
        return this.#position;
    }

    static #validateName(name) {
        if (name.length > CONSTANTS.MAX_NAME_LENGTH) {
            throw new Error(ERROR_MESSAGES.EXCEEDS_MAX_LENGTH);
        }
        if (name.length < CONSTANTS.MIN_NAME_LENGTH) {
            throw new Error(ERROR_MESSAGES.MIN_NAME_LENGTH);
        }
    }

    static create(name) {
        this.#validateName(name);
        return new Car(name);
    }

    move() {
      const randomNumber = Random.pickNumberInRange(CONSTANTS.RAMDOM_NUMBER_MIN,CONSTANTS.RAMDOM_NUMBER_MAX);
      if (randomNumber >= CONSTANTS.RANDIM_NUMBER_THRESHOLD) this.#position += 1;
    }  
}

export default Car;