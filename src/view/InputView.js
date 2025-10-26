import { Console } from "@woowacourse/mission-utils";
import { UI_MESSAGES } from "../constants/messages.js";

class InputView {
  static async getCars() {
    const carsInput = await Console.readLineAsync(UI_MESSAGES.GET_CARS);
    return carsInput;
  }

  static async getTryCount() {
    const tryCountInput = await Console.readLineAsync(
      UI_MESSAGES.GET_TRY_COUNTS
    );
    return tryCountInput;
  }
}

export default InputView;