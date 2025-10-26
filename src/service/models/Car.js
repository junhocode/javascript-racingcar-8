import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "../../constants/messages";

class Car {
    #name; 
    #distance;

    constructor(name) {
        this.#name = name;
        this.#distance = 0;
    }

    static #validateName(name) {
        if (name.length > CONSTANTS.MAX_NAME_LENGTH) {
            throw new Error(ERROR_MESSAGES.EXCEEDS_MAX_LENGTH);
        }
        if (name.trim().length === 0) {
            throw new Error(ERROR_MESSAGES.EMPTY_NAME);
        }
    }

    static create(name) {
        this.#validateName(name);
        return new Car(name);
    }

    #moveForward() {
      const randomNumber = Console.Random.pickNumberInRange(0,9);
       
      if (randomNumber >= 4) this.#distance += 1;
    }

    race() {
        this.#moveForward()

        const name = this.#name;
        const currentDistance = this.#distance;
        return { name, currentDistance };
    }  
}

export default Car;