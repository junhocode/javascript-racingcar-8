import { Console } from "@woowacourse/mission-utils";
import { UI_MESSAGES } from "../constants/messages.js";

class OutputView {
  static printResultHeader() {
    Console.print(UI_MESSAGES.RESULTS_HEADER);
  }

  static printAllRoundResults(results) {
    Console.print(UI_MESSAGES.RESULTS(results));
  }

  static printWinners(winners) {
    Console.print(UI_MESSAGES.WINNERS(winners));
  }
}

export default OutputView;